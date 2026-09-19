/*
 * CHECK KEY - ANALYTICS ENGINE
 * STEP 4.1
 *
 * This module is responsible for:
 * - anonymous browser ID
 * - session ID
 * - Firebase Auth token bridge supplied by script.js
 * - event creation and delivery to /api/analytics-event
 * - feature dwell-time tracking
 * - tab visibility pause/resume
 * - safe metadata sanitization
 *
 * This module MUST remain non-critical:
 * analytics failures must never break CHECK KEY.
 */

(function () {
  "use strict";

  const CONFIG = {
    ANONYMOUS_ID_STORAGE_KEY: "checkkey_analytics_anonymous_id",
    SESSION_ID_STORAGE_KEY: "checkkey_analytics_session_id",

    API_ENDPOINT: "/api/analytics-event",

    SESSION_TIMEOUT_MS: 30 * 60 * 1000,

    REQUEST_TIMEOUT_MS: 5000,

    MAX_QUEUE_SIZE: 100,

    MAX_STRING_LENGTH: 500,

    MAX_METADATA_KEYS: 30,

    MAX_ARRAY_ITEMS: 20,

    MAX_OBJECT_DEPTH: 3
  };


  // ============================================================
  // INTERNAL STATE
  // ============================================================

  let anonymousId = null;
  let sessionId = null;

  let sessionStartedAt = null;
  let lastActivityAt = null;

  let eventQueue = [];

  let sessionTimer = null;

  let initialized = false;

  let endingSession = false;

  let authTokenProvider = null;

  const activeFeatures = new Map();


  // ============================================================
  // ID GENERATION
  // ============================================================

  function generateId(prefix) {
    try {
      if (
        window.crypto &&
        typeof window.crypto.randomUUID === "function"
      ) {
        return `${prefix}_${window.crypto.randomUUID()}`;
      }
    } catch (error) {
      console.warn(
        "[Analytics] crypto.randomUUID unavailable.",
        error
      );
    }

    return [
      prefix,
      Date.now().toString(36),
      Math.random().toString(36).slice(2),
      Math.random().toString(36).slice(2)
    ].join("_");
  }


  // ============================================================
  // ANONYMOUS ID
  // ============================================================

  function getOrCreateAnonymousId() {
    try {
      const existing = localStorage.getItem(
        CONFIG.ANONYMOUS_ID_STORAGE_KEY
      );

      if (
        typeof existing === "string" &&
        existing.trim() !== ""
      ) {
        return existing;
      }

      const created = generateId("anon");

      localStorage.setItem(
        CONFIG.ANONYMOUS_ID_STORAGE_KEY,
        created
      );

      return created;
    } catch (error) {
      console.warn(
        "[Analytics] Could not persist anonymous ID. Using memory-only ID.",
        error
      );

      return generateId("anon");
    }
  }


  // ============================================================
  // SESSION ID
  // ============================================================

  function createSessionId() {
    const created = generateId("session");

    try {
      sessionStorage.setItem(
        CONFIG.SESSION_ID_STORAGE_KEY,
        created
      );
    } catch (error) {
      console.warn(
        "[Analytics] Could not persist session ID.",
        error
      );
    }

    return created;
  }


  function getStoredSessionId() {
    try {
      const existing = sessionStorage.getItem(
        CONFIG.SESSION_ID_STORAGE_KEY
      );

      if (
        typeof existing === "string" &&
        existing.trim() !== ""
      ) {
        return existing;
      }

      return null;
    } catch (error) {
      return null;
    }
  }


  function initializeSession() {
    anonymousId =
      anonymousId || getOrCreateAnonymousId();

    const storedSessionId =
      getStoredSessionId();

    sessionId =
      storedSessionId || createSessionId();

    sessionStartedAt = Date.now();
    lastActivityAt = Date.now();

    endingSession = false;

    startSessionTimer();

    return sessionId;
  }


  // ============================================================
  // SESSION TIMEOUT
  // ============================================================

  function startSessionTimer() {
    stopSessionTimer();

    sessionTimer = window.setInterval(() => {
      if (!sessionId || endingSession) {
        return;
      }

      const now = Date.now();

      if (
        lastActivityAt &&
        now - lastActivityAt >=
          CONFIG.SESSION_TIMEOUT_MS
      ) {
        endSession("timeout");
      }
    }, 60 * 1000);
  }


  function stopSessionTimer() {
    if (sessionTimer !== null) {
      window.clearInterval(sessionTimer);
      sessionTimer = null;
    }
  }


  function refreshActivity() {
    lastActivityAt = Date.now();
  }


  // ============================================================
  // FIREBASE AUTH BRIDGE
  // ============================================================

  /*
   * script.js owns Firebase Auth.
   *
   * It should provide:
   *
   * CheckKeyAnalytics.setAuthProvider(async () => {
   *   if (!auth.currentUser) return null;
   *   return await auth.currentUser.getIdToken();
   * });
   *
   * This keeps Firebase Auth out of the analytics module itself.
   */
  function setAuthProvider(provider) {
    authTokenProvider =
      typeof provider === "function"
        ? provider
        : null;
  }


  async function getAuthToken() {
    if (!authTokenProvider) {
      return null;
    }

    try {
      const token =
        await authTokenProvider();

      if (
        typeof token !== "string" ||
        token.trim() === ""
      ) {
        return null;
      }

      return token;
    } catch (error) {
      /*
       * Never let analytics authentication errors
       * affect CHECK KEY.
       */
      console.warn(
        "[Analytics] Failed to obtain Firebase ID token.",
        error
      );

      return null;
    }
  }


  // ============================================================
  // SENSITIVE DATA SANITIZATION
  // ============================================================

  const SENSITIVE_KEY_PATTERNS = [
    /password/i,
    /passwd/i,
    /master.?pwd/i,
    /master.?password/i,
    /recovery.?pin/i,
    /secret/i,
    /private.?key/i,
    /vault.?key/i,
    /wrapped.?key/i,
    /ciphertext/i,
    /plaintext/i,
    /security.?answer/i,
    /credential.?password/i,
    /token/i,
    /authorization/i,
    /cookie/i
  ];


  function isSensitiveKey(key) {
    return SENSITIVE_KEY_PATTERNS.some(
      pattern => pattern.test(String(key))
    );
  }


  function sanitizeValue(value, depth = 0) {
    if (depth > CONFIG.MAX_OBJECT_DEPTH) {
      return "[truncated]";
    }

    if (value === null) {
      return null;
    }

    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      if (
        typeof value === "number" &&
        !Number.isFinite(value)
      ) {
        return null;
      }

      if (typeof value === "string") {
        return value.slice(
          0,
          CONFIG.MAX_STRING_LENGTH
        );
      }

      return value;
    }

    if (Array.isArray(value)) {
      return value
        .slice(0, CONFIG.MAX_ARRAY_ITEMS)
        .map(item =>
          sanitizeValue(
            item,
            depth + 1
          )
        );
    }

    if (
      typeof value === "object" &&
      value !== null
    ) {
      const output = {};

      Object.entries(value)
        .slice(0, CONFIG.MAX_METADATA_KEYS)
        .forEach(([key, item]) => {
          if (isSensitiveKey(key)) {
            return;
          }

          const sanitized =
            sanitizeValue(
              item,
              depth + 1
            );

          if (
            sanitized !== undefined
          ) {
            output[key] = sanitized;
          }
        });

      return output;
    }

    return undefined;
  }


  function sanitizeMetadata(metadata) {
    if (
      !metadata ||
      typeof metadata !== "object" ||
      Array.isArray(metadata)
    ) {
      return {};
    }

    const sanitized =
      sanitizeValue(metadata);

    return (
      sanitized &&
      typeof sanitized === "object" &&
      !Array.isArray(sanitized)
    )
      ? sanitized
      : {};
  }


  // ============================================================
  // EVENT VALIDATION
  // ============================================================

  const EVENT_NAME_PATTERN =
    /^[a-zA-Z0-9._:-]{1,100}$/;


  function isValidEventName(eventName) {
    return (
      typeof eventName === "string" &&
      EVENT_NAME_PATTERN.test(eventName)
    );
  }


  // ============================================================
  // EVENT CREATION
  // ============================================================

  function buildEvent(
    eventName,
    payload = {}
  ) {
    if (!isValidEventName(eventName)) {
      return null;
    }

    refreshActivity();

    return {
      event: eventName,

      anonymousId,

      sessionId,

      clientTimestamp:
        new Date().toISOString(),

      metadata:
        sanitizeMetadata(payload)
    };
  }


  // ============================================================
  // BACKEND DELIVERY
  // ============================================================

  async function sendEvent(event) {
    if (!event) {
      return false;
    }

    const controller =
      new AbortController();

    const timeout =
      window.setTimeout(
        () => controller.abort(),
        CONFIG.REQUEST_TIMEOUT_MS
      );

    try {
      const headers = {
        "Content-Type":
          "application/json"
      };

      const token =
        await getAuthToken();

      if (token) {
        headers.Authorization =
          `Bearer ${token}`;
      }

      const response =
        await fetch(
          CONFIG.API_ENDPOINT,
          {
            method: "POST",

            headers,

            body:
              JSON.stringify(event),

            keepalive: true,

            signal:
              controller.signal
          }
        );

      if (!response.ok) {
        throw new Error(
          `Analytics API returned ${response.status}`
        );
      }

      const result =
        await response
          .json()
          .catch(() => ({}));

      return (
        result &&
        result.success === true
      );
    } catch (error) {
      /*
       * IMPORTANT:
       * Analytics failures are swallowed.
       *
       * A broken analytics endpoint must never prevent
       * login, vault unlock, credential management, recovery,
       * or any other CHECK KEY functionality.
       */
      console.warn(
        "[Analytics] Event delivery failed.",
        error
      );

      return false;
    } finally {
      window.clearTimeout(timeout);
    }
  }


  async function deliverEvent(event) {
    if (!event) {
      return false;
    }

    const delivered =
      await sendEvent(event);

    if (!delivered) {
      return false;
    }

    const index =
      eventQueue.indexOf(event);

    if (index !== -1) {
      eventQueue.splice(index, 1);
    }

    return true;
  }


  // ============================================================
  // EVENT TRACKING
  // ============================================================

  function track(
    eventName,
    payload = {}
  ) {
    try {
      if (
        !isValidEventName(eventName)
      ) {
        console.warn(
          "[Analytics] Ignored invalid event name.",
          eventName
        );

        return null;
      }

      /*
       * Anonymous ID/session may not yet exist if track()
       * is manually called extremely early. Initialize them
       * safely rather than throwing.
       */
      if (!anonymousId) {
        anonymousId =
          getOrCreateAnonymousId();
      }

      if (!sessionId) {
        initializeSession();
      }

      const event =
        buildEvent(
          eventName,
          payload
        );

      if (!event) {
        return null;
      }

      eventQueue.push(event);

      if (
        eventQueue.length >
        CONFIG.MAX_QUEUE_SIZE
      ) {
        eventQueue.shift();
      }

      /*
       * Fire-and-forget.
       * The Promise is intentionally not awaited by callers.
       */
      void deliverEvent(event);

      console.debug(
        "[Analytics]",
        event
      );

      return event;
    } catch (error) {
      console.warn(
        "[Analytics] track() failed.",
        error
      );

      return null;
    }
  }


  // ============================================================
  // FEATURE DWELL TIME
  // ============================================================

  function startFeature(
    feature,
    metadata = {}
  ) {
    try {
      if (
        typeof feature !== "string" ||
        feature.trim() === ""
      ) {
        return null;
      }

      const normalizedFeature =
        feature.trim();

      /*
       * One timer per feature.
       * If the feature is already active, do nothing.
       */
      if (
        activeFeatures.has(
          normalizedFeature
        )
      ) {
        return (
          activeFeatures.get(
            normalizedFeature
          )
        );
      }

      const now =
        Date.now();

      const state = {
        feature:
          normalizedFeature,

        startedAt: now,

        metadata:
          sanitizeMetadata(
            metadata
          ),

        accumulatedVisibleMs: 0,

        visibleStartedAt:
          document.hidden
            ? null
            : now
      };

      activeFeatures.set(
        normalizedFeature,
        state
      );

      track(
        "feature_view",
        {
          feature:
            normalizedFeature,

          ...state.metadata
        }
      );

      refreshActivity();

      return state;
    } catch (error) {
      console.warn(
        "[Analytics] startFeature() failed.",
        error
      );

      return null;
    }
  }


  function pauseFeature(feature) {
    const state =
      activeFeatures.get(feature);

    if (!state) {
      return;
    }

    if (
      state.visibleStartedAt !== null
    ) {
      state.accumulatedVisibleMs +=
        Math.max(
          0,
          Date.now() -
            state.visibleStartedAt
        );

      state.visibleStartedAt = null;
    }
  }


  function resumeFeature(feature) {
    const state =
      activeFeatures.get(feature);

    if (!state) {
      return;
    }

    if (
      state.visibleStartedAt === null &&
      !document.hidden
    ) {
      state.visibleStartedAt =
        Date.now();
    }

    refreshActivity();
  }


  function stopFeature(
    feature,
    metadata = {}
  ) {
    const state =
      activeFeatures.get(feature);

    if (!state) {
      return null;
    }

    if (
      state.visibleStartedAt !== null
    ) {
      state.accumulatedVisibleMs +=
        Math.max(
          0,
          Date.now() -
            state.visibleStartedAt
        );
    }

    const durationMs =
      Math.max(
        0,
        Math.round(
          state.accumulatedVisibleMs
        )
      );

    const event =
      track(
        "feature_exit",
        {
          feature,

          durationMs,

          ...state.metadata,

          ...sanitizeMetadata(
            metadata
          )
        }
      );

    activeFeatures.delete(
      feature
    );

    return event;
  }


  function stopAllFeatures() {
    const features =
      Array.from(
        activeFeatures.keys()
      );

    features.forEach(
      feature => {
        stopFeature(feature);
      }
    );
  }


  // ============================================================
  // FEATURE HELPERS
  // ============================================================

  function trackFeatureView(
    feature,
    metadata = {}
  ) {
    return startFeature(
      feature,
      metadata
    );
  }


  function trackFeatureExit(
    feature,
    metadata = {}
  ) {
    return stopFeature(
      feature,
      metadata
    );
  }


  function trackError(
    feature,
    error,
    metadata = {}
  ) {
    let errorCode = "unknown";
    let errorMessage = null;

    try {
      if (
        error &&
        typeof error === "object"
      ) {
        errorCode =
          error.code ||
          error.name ||
          "unknown";

        if (
          typeof error.message ===
          "string"
        ) {
          errorMessage =
            error.message.slice(
              0,
              200
            );
        }
      } else if (
        typeof error === "string"
      ) {
        errorMessage =
          error.slice(
            0,
            200
          );
      }
    } catch (parseError) {
      console.warn(
        "[Analytics] Unable to parse error.",
        parseError
      );
    }

    return track(
      "feature_error",
      {
        feature,

        errorCode,

        errorMessage,

        ...sanitizeMetadata(
          metadata
        )
      }
    );
  }


  // ============================================================
  // VISIBILITY
  // ============================================================

  function handleVisibilityChange() {
    try {
      if (document.hidden) {
        activeFeatures.forEach(
          state => {
            pauseFeature(
              state.feature
            );
          }
        );

        return;
      }

      refreshActivity();

      activeFeatures.forEach(
        state => {
          resumeFeature(
            state.feature
          );
        }
      );
    } catch (error) {
      console.warn(
        "[Analytics] Visibility handler failed.",
        error
      );
    }
  }


  // ============================================================
  // SESSION END
  // ============================================================

  function endSession(
    reason = "manual"
  ) {
    if (
      !sessionId ||
      endingSession
    ) {
      return null;
    }

    endingSession = true;

    try {
      const durationMs =
        sessionStartedAt
          ? Math.max(
              0,
              Date.now() -
                sessionStartedAt
            )
          : 0;

      /*
       * Send currently active feature exits first.
       */
      stopAllFeatures();

      const event =
        track(
          "session_end",
          {
            reason,
            durationMs
          }
        );

      stopSessionTimer();

      sessionId = null;
      sessionStartedAt = null;
      lastActivityAt = null;

      try {
        sessionStorage.removeItem(
          CONFIG.SESSION_ID_STORAGE_KEY
        );
      } catch (storageError) {
        console.warn(
          "[Analytics] Could not clear session ID.",
          storageError
        );
      }

      return event;
    } catch (error) {
      console.warn(
        "[Analytics] endSession() failed.",
        error
      );

      return null;
    } finally {
      endingSession = false;
    }
  }


  // ============================================================
  // QUEUE / STATE
  // ============================================================

  function getQueuedEvents() {
    return eventQueue.slice();
  }


  function clearQueuedEvents() {
    eventQueue = [];
  }


  function getState() {
    return {
      anonymousId,

      sessionId,

      sessionStartedAt,

      lastActivityAt,

      queueLength:
        eventQueue.length,

      activeFeatures:
        Array.from(
          activeFeatures.keys()
        ),

      hasAuthProvider:
        typeof authTokenProvider ===
        "function",

      initialized
    };
  }


  // ============================================================
  // USER ACTIVITY
  // ============================================================

  function handleUserActivity() {
    refreshActivity();
  }


  // ============================================================
  // PAGE LIFECYCLE
  // ============================================================

  function handlePageHide() {
    /*
     * Do not create a new session when the page is unloading.
     *
     * Active feature timers are finalized locally. The current
     * implementation relies on the already-fired feature_exit
     * requests using keepalive.
     */
    try {
      const features =
        Array.from(
          activeFeatures.keys()
        );

      features.forEach(
        feature => {
          stopFeature(feature);
        }
      );
    } catch (error) {
      console.warn(
        "[Analytics] Page hide handling failed.",
        error
      );
    }
  }


  // ============================================================
  // INITIALIZATION
  // ============================================================

  function initialize() {
    if (initialized) {
      return true;
    }

    initialized = true;

    initializeSession();

    /*
     * Exactly one session_start per initialized browser session.
     */
    track("session_start");

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    window.addEventListener(
      "pagehide",
      handlePageHide
    );

    [
      "click",
      "keydown",
      "scroll",
      "touchstart"
    ].forEach(
      eventName => {
        window.addEventListener(
          eventName,
          handleUserActivity,
          {
            passive: true
          }
        );
      }
    );

    return true;
  }


  // ============================================================
  // PUBLIC API
  // ============================================================

  window.CheckKeyAnalytics = {
    initialize,

    track,

    startFeature,
    pauseFeature,
    resumeFeature,
    stopFeature,
    stopAllFeatures,

    trackFeatureView,
    trackFeatureExit,
    trackError,

    endSession,

    getQueuedEvents,
    clearQueuedEvents,
    getState,

    setAuthProvider,

    getAnonymousId:
      () => anonymousId,

    getSessionId:
      () => sessionId
  };


  // ============================================================
  // AUTO INITIALIZATION
  // ============================================================

  if (
    document.readyState === "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      initialize,
      {
        once: true
      }
    );
  } else {
    initialize();
  }

})();
