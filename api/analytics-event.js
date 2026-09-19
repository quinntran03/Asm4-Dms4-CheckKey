
import { getApps, initializeApp, cert } from "firebase-admin/app";
import {
  getFirestore,
  FieldValue
} from "firebase-admin/firestore";
import {
  getAuth
} from "firebase-admin/auth";


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

const MAX_EVENT_NAME_LENGTH = 100;
const MAX_METADATA_KEYS = 30;
const MAX_METADATA_STRING_LENGTH = 500;

const ALLOWED_EVENT_NAME = /^[a-zA-Z0-9._:-]+$/;


// ============================================================
// SENSITIVE DATA FILTER
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
  /token/i
];


function isSensitiveKey(key) {
  return SENSITIVE_KEY_PATTERNS.some(
    pattern => pattern.test(String(key))
  );
}


// ============================================================
// SANITIZATION
// ============================================================

function sanitizeValue(value, depth = 0) {
  if (depth > 3) {
    return "[truncated]";
  }

  if (value === null) {
    return null;
  }

  if (
    typeof value === "string"
    || typeof value === "number"
    || typeof value === "boolean"
  ) {
    if (typeof value === "string") {
      return value.slice(0, MAX_METADATA_STRING_LENGTH);
    }

    return value;
  }

  if (Array.isArray(value)) {
    return value
      .slice(0, 20)
      .map(item => sanitizeValue(item, depth + 1));
  }

  if (typeof value === "object") {
    const result = {};

    for (
      const [key, item]
      of Object.entries(value).slice(0, MAX_METADATA_KEYS)
    ) {
      if (isSensitiveKey(key)) {
        continue;
      }

      result[key] = sanitizeValue(
        item,
        depth + 1
      );
    }

    return result;
  }

  return undefined;
}


function sanitizeMetadata(metadata) {
  if (
    !metadata
    || typeof metadata !== "object"
    || Array.isArray(metadata)
  ) {
    return {};
  }

  const result = {};

  for (
    const [key, value]
    of Object.entries(metadata).slice(0, MAX_METADATA_KEYS)
  ) {
    if (isSensitiveKey(key)) {
      continue;
    }

    result[key] = sanitizeValue(value);
  }

  return result;
}


// ============================================================
// AUTHENTICATION
// ============================================================

async function verifyFirebaseUser(req) {
  const authorization = req.headers.authorization;

  if (
    !authorization ||
    typeof authorization !== "string"
  ) {
    return null;
  }

  if (!authorization.startsWith("Bearer ")) {
    return null;
  }

  const idToken = authorization.slice(7).trim();

  if (!idToken) {
    return null;
  }

  try {
    return await adminAuth.verifyIdToken(idToken);
  } catch (error) {
    console.warn(
      "[Analytics] Invalid Firebase ID token.",
      error?.code || error?.message
    );

    return null;
  }
}


// ============================================================
// REQUEST VALIDATION
// ============================================================

function validateEventName(eventName) {
  if (
    typeof eventName !== "string"
    || eventName.length === 0
    || eventName.length > MAX_EVENT_NAME_LENGTH
  ) {
    return false;
  }

  return ALLOWED_EVENT_NAME.test(eventName);
}


function normalizeAnonymousId(value) {
  if (
    typeof value !== "string"
    || value.length < 1
    || value.length > 200
  ) {
    return null;
  }

  return value.slice(0, 200);
}


function normalizeSessionId(value) {
  if (
    typeof value !== "string"
    || value.length < 1
    || value.length > 200
  ) {
    return null;
  }

  return value.slice(0, 200);
}


// ============================================================
// HANDLER
// ============================================================

export default async function handler(req, res) {

  // ----------------------------------------------------------
  // CORS
  // ----------------------------------------------------------

  res.setHeader(
    "Access-Control-Allow-Origin",
    "*"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, OPTIONS"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }


  // ----------------------------------------------------------
  // METHOD
  // ----------------------------------------------------------

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed."
    });
  }


  // ----------------------------------------------------------
  // BODY
  // ----------------------------------------------------------

  const body = req.body;

  if (
    !body
    || typeof body !== "object"
    || Array.isArray(body)
  ) {
    return res.status(400).json({
      success: false,
      error: "Invalid request body."
    });
  }


  // ----------------------------------------------------------
  // EVENT NAME
  // ----------------------------------------------------------

  const eventName = body.event;

  if (!validateEventName(eventName)) {
    return res.status(400).json({
      success: false,
      error: "Invalid analytics event name."
    });
  }


  // ----------------------------------------------------------
  // IDs
  // ----------------------------------------------------------

  const anonymousId = normalizeAnonymousId(
    body.anonymousId
  );

  const sessionId = normalizeSessionId(
    body.sessionId
  );

  if (!anonymousId || !sessionId) {
    return res.status(400).json({
      success: false,
      error: "Missing analytics identifiers."
    });
  }


  // ----------------------------------------------------------
  // FIREBASE USER
  // ----------------------------------------------------------

  const firebaseUser = await verifyFirebaseUser(req);


  // ----------------------------------------------------------
  // METADATA
  // ----------------------------------------------------------

  const metadata = sanitizeMetadata(
    body.metadata
  );


  // ----------------------------------------------------------
  // SERVER-SIDE EVENT
  // ----------------------------------------------------------

  const eventDocument = {
    event: eventName,

    anonymousId,
    sessionId,

    metadata,

    // Authoritative timestamp.
    serverTimestamp: FieldValue.serverTimestamp(),

    // Retain whether this request was associated with
    // an authenticated Firebase identity.
    authenticated: Boolean(firebaseUser),

    // Store Firebase UID only server-side.
    // It is NOT accepted from the client body.
    ...(firebaseUser?.uid
      ? {
          uidHashSource: firebaseUser.uid
        }
      : {}),

    // Small anti-abuse/context fields.
    source: "web",
    version: 1
  };


  // ----------------------------------------------------------
  // FIRESTORE WRITE
  // ----------------------------------------------------------

  try {

    const docRef = await db
      .collection("analytics_events")
      .add(eventDocument);

    return res.status(200).json({
      success: true,
      eventId: docRef.id
    });

  } catch (error) {

    console.error(
      "[Analytics] Firestore write failed:",
      error
    );

    return res.status(500).json({
      success: false,
      error: "Unable to store analytics event."
    });
  }
}