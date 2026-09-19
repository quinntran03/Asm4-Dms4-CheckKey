
import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";


// ============================================================
// FIREBASE ADMIN INITIALIZATION
// ============================================================

function getFirebaseAdminApp() {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Firebase Admin environment variables are not configured."
    );
  }

  return initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey: privateKey.replace(/\\n/g, "\n")
    })
  });
}


const app = getFirebaseAdminApp();
const db = getFirestore(app);
const adminAuth = getAuth(app);


// ============================================================
// CONFIG
// ============================================================

const ADMIN_UID = process.env.ANALYTICS_ADMIN_UID;


// ============================================================
// ADMIN AUTHORIZATION
// ============================================================

async function requireAnalyticsAdmin(req) {
  if (!ADMIN_UID) {
    throw new Error(
      "ANALYTICS_ADMIN_UID is not configured."
    );
  }

  const authorization =
    req.headers.authorization;

  if (
    !authorization ||
    typeof authorization !== "string" ||
    !authorization.startsWith("Bearer ")
  ) {
    const error = new Error("Authentication required.");
    error.statusCode = 401;
    throw error;
  }

  const idToken =
    authorization.slice(7).trim();

  if (!idToken) {
    const error = new Error("Authentication required.");
    error.statusCode = 401;
    throw error;
  }

  let decodedToken;

  try {
    decodedToken =
      await adminAuth.verifyIdToken(idToken);
  } catch (error) {
    console.warn(
      "[Analytics Admin] Invalid Firebase token.",
      error?.code || error?.message
    );

    const authError =
      new Error("Invalid authentication token.");

    authError.statusCode = 401;

    throw authError;
  }

  if (decodedToken.uid !== ADMIN_UID) {
    const error =
      new Error("Analytics access denied.");

    error.statusCode = 403;

    throw error;
  }

  return decodedToken;
}


// ============================================================
// DATE HELPERS
// ============================================================

function getDateRange(query) {
  const now = new Date();

  const requestedDaysRaw =
    typeof query?.days === "string"
      ? query.days.trim().toLowerCase()
      : query?.days;

  // STEP 5.1:
  // Support 7 days, 30 days, and all-time without changing
  // the existing default behavior.
  if (requestedDaysRaw === "all") {
    return {
      start: null,
      end: now,
      days: null,
      allTime: true
    };
  }

  const requestedDays =
    Number.parseInt(
      requestedDaysRaw,
      10
    );

  const days =
    Number.isFinite(requestedDays)
      ? Math.min(Math.max(requestedDays, 1), 90)
      : 7;

  const end = now;

  const start =
    new Date(
      now.getTime()
      - ((days - 1) * 24 * 60 * 60 * 1000)
    );

  return {
    start,
    end,
    days,
    allTime: false
  };
}


// ============================================================
// FIRESTORE EVENT NORMALIZATION
// ============================================================

function timestampToDate(value) {
  if (!value) {
    return null;
  }

  if (
    typeof value.toDate === "function"
  ) {
    return value.toDate();
  }

  if (value instanceof Date) {
    return value;
  }

  if (typeof value === "string") {
    const parsed =
      new Date(value);

    return Number.isNaN(parsed.getTime())
      ? null
      : parsed;
  }

  return null;
}


// ============================================================
// SUMMARY CALCULATION
// ============================================================

function calculateSummary(events) {
  const visitors = new Set();
  const activeVisitors = new Set();
  const sessions = new Set();

  const featureStats = {};
  const featureUsers = {};
  const eventCounts = {};
  const errorCounts = {};
  const dailyActivity = {};

  let totalSessionDurationMs = 0;
  let sessionEndCount = 0;


  for (const event of events) {

    // --------------------------------------------------------
    // Unique visitors
    // --------------------------------------------------------

    if (event.anonymousId) {
      visitors.add(
        event.anonymousId
      );
    }


    // --------------------------------------------------------
    // Unique sessions
    // --------------------------------------------------------

    if (event.sessionId) {
      sessions.add(
        event.sessionId
      );
    }


    // --------------------------------------------------------
    // Event counts
    // --------------------------------------------------------

    const eventName =
      event.event;

    if (eventName) {
      eventCounts[eventName] =
        (eventCounts[eventName] || 0) + 1;
    }


    // --------------------------------------------------------
    // Active visitors
    // --------------------------------------------------------

    // session_start establishes a session, but is not itself
    // treated as meaningful feature activity for Active Users.
    if (
      event.anonymousId
      && eventName
      && eventName !== "session_start"
    ) {
      activeVisitors.add(
        event.anonymousId
      );
    }


    // --------------------------------------------------------
    // Daily activity
    // --------------------------------------------------------

    if (eventName) {
      const eventDate =
        timestampToDate(
          event.serverTimestamp
            || event.clientTimestamp
        );

      if (eventDate) {
        const dayKey =
          eventDate.toISOString().slice(0, 10);

        dailyActivity[dayKey] =
          (dailyActivity[dayKey] || 0) + 1;
      }
    }


    // --------------------------------------------------------
    // Session duration
    // --------------------------------------------------------

    if (
      eventName === "session_end"
      && event.metadata
      && Number.isFinite(
        event.metadata.durationMs
      )
    ) {
      totalSessionDurationMs +=
        Math.max(
          0,
          event.metadata.durationMs
        );

      sessionEndCount++;
    }


    // --------------------------------------------------------
    // Feature usage
    // --------------------------------------------------------

    // Feature usage is based on unique visitors who generated
    // feature_view for that feature.
    if (
      eventName === "feature_view"
      && event.anonymousId
      && event.metadata
      && typeof event.metadata.feature === "string"
    ) {
      const feature =
        event.metadata.feature;

      if (!featureUsers[feature]) {
        featureUsers[feature] = new Set();
      }

      featureUsers[feature].add(
        event.anonymousId
      );
    }


    // --------------------------------------------------------
    // Feature dwell time
    // --------------------------------------------------------

    if (
      eventName === "feature_exit"
      && event.metadata
      && typeof event.metadata.feature === "string"
      && Number.isFinite(
        event.metadata.durationMs
      )
    ) {
      const feature =
        event.metadata.feature;

      if (!featureStats[feature]) {
        featureStats[feature] = {
          views: 0,
          totalDurationMs: 0,
          durations: []
        };
      }

      featureStats[feature].views++;

      const durationMs =
        Math.max(
          0,
          event.metadata.durationMs
        );

      featureStats[feature]
        .totalDurationMs += durationMs;

      featureStats[feature]
        .durations
        .push(durationMs);
    }


    // --------------------------------------------------------
    // Error events
    // --------------------------------------------------------

    const looksLikeError =
      typeof eventName === "string"
      && (
        eventName.endsWith("_failed")
        || eventName.includes("error")
      );

    if (looksLikeError) {
      errorCounts[eventName] =
        (errorCounts[eventName] || 0) + 1;
    }
  }


  // ==========================================================
  // Feature summary
  // ==========================================================

  const features = {};

  for (
    const [
      feature,
      data
    ] of Object.entries(featureStats)
  ) {
    const durations =
      data.durations
        .slice()
        .sort(
          (a, b) => a - b
        );

    let medianDurationMs = 0;

    if (durations.length > 0) {
      const middle =
        Math.floor(
          durations.length / 2
        );

      if (
        durations.length % 2 === 0
      ) {
        medianDurationMs =
          Math.round(
            (
              durations[middle - 1]
              + durations[middle]
            ) / 2
          );
      } else {
        medianDurationMs =
          durations[middle];
      }
    }

    const averageDurationMs =
      data.views > 0
        ? Math.round(
            data.totalDurationMs
            / data.views
          )
        : 0;

    const uniqueUsers =
      featureUsers[feature]
        ? featureUsers[feature].size
        : 0;

    const usageRate =
      activeVisitors.size > 0
        ? Math.round(
            (uniqueUsers / activeVisitors.size) * 100
          )
        : 0;

    features[feature] = {
      views: data.views,
      totalDurationMs:
        data.totalDurationMs,
      averageDurationMs,
      medianDurationMs,
      uniqueUsers,
      usageRate
    };
  }


  // ------------------------------------------------------------
  // Daily activity summary
  // ------------------------------------------------------------

  const activity =
    Object.entries(dailyActivity)
      .sort(
        ([dateA], [dateB]) =>
          dateA.localeCompare(dateB)
      )
      .map(
        ([date, eventsCount]) => ({
          date,
          events: eventsCount
        })
      );


  return {
    totalEvents: events.length,

    uniqueVisitors:
      visitors.size,

    uniqueSessions:
      sessions.size,

    activeUsers:
      activeVisitors.size,

    averageSessionDurationMs:
      sessionEndCount > 0
        ? Math.round(
            totalSessionDurationMs
            / sessionEndCount
          )
        : 0,

    eventCounts,

    features,

    activity,

    errors:
      errorCounts
  };
}


// ============================================================
// HANDLER
// ============================================================

export default async function handler(req, res) {

  // ----------------------------------------------------------
  // Method
  // ----------------------------------------------------------

  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed."
    });
  }


  // ----------------------------------------------------------
  // Authentication
  // ----------------------------------------------------------

  try {
    await requireAnalyticsAdmin(req);
  } catch (error) {

    const status =
      Number.isInteger(
        error?.statusCode
      )
        ? error.statusCode
        : 500;

    return res.status(status).json({
      success: false,
      error:
        status === 403
          ? "Analytics access denied."
          : status === 401
            ? "Authentication required."
            : "Analytics service unavailable."
    });
  }


  // ----------------------------------------------------------
  // Date range
  // ----------------------------------------------------------

  const range =
    getDateRange(req.query);


  // ----------------------------------------------------------
  // Load events
  // ----------------------------------------------------------

  try {

    let eventsQuery =
      db
        .collection("analytics_events");

    if (!range.allTime) {
      eventsQuery = eventsQuery
        .where(
          "serverTimestamp",
          ">=",
          range.start
        )
        .where(
          "serverTimestamp",
          "<=",
          range.end
        );
    }

    const snapshot =
      await eventsQuery
        .orderBy(
          "serverTimestamp",
          "asc"
        )
        .limit(50000)
        .get();


    const events =
      snapshot.docs.map(
        doc => ({
          id: doc.id,
          ...doc.data()
        })
      );


    // --------------------------------------------------------
    // Normalize timestamp fields
    // --------------------------------------------------------

    const normalizedEvents =
      events.filter(
        event => {
          const date =
            timestampToDate(
              event.serverTimestamp
            );

          return date !== null;
        }
      );


    // --------------------------------------------------------
    // Calculate
    // --------------------------------------------------------

    const summary =
      calculateSummary(
        normalizedEvents
      );


    // --------------------------------------------------------
    // Response
    // --------------------------------------------------------

    return res.status(200).json({
      success: true,

      range: {
        start:
          range.start
            ? range.start.toISOString()
            : null,

        end:
          range.end.toISOString(),

        days:
          range.days,

        allTime:
          range.allTime
      },

      summary
    });

  } catch (error) {

    console.error(
      "[Analytics Admin] Failed to load analytics:",
      error
    );

    return res.status(500).json({
      success: false,
      error:
        "Unable to load analytics."
    });
  }
}