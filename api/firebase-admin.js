const {
  cert,
  getApp,
  getApps,
  initializeApp
} = require('firebase-admin/app');

const { getAuth } = require('firebase-admin/auth');

const {
  getFirestore,
  FieldValue,
  Timestamp
} = require('firebase-admin/firestore');

const isProduction = process.env.VERCEL_ENV === 'production';

const projectId = isProduction
  ? process.env.FIREBASE_PROJECT_ID
  : process.env.DEV_FIREBASE_PROJECT_ID;

const clientEmail = isProduction
  ? process.env.FIREBASE_CLIENT_EMAIL
  : process.env.DEV_FIREBASE_CLIENT_EMAIL;

const privateKeyValue = isProduction
  ? process.env.FIREBASE_PRIVATE_KEY
  : process.env.DEV_FIREBASE_PRIVATE_KEY;

const environment = isProduction ? 'PRODUCTION' : 'DEVELOPMENT';

const missingVariables = [];

if (!projectId) {
  missingVariables.push(
    isProduction
      ? 'FIREBASE_PROJECT_ID'
      : 'DEV_FIREBASE_PROJECT_ID'
  );
}

if (!clientEmail) {
  missingVariables.push(
    isProduction
      ? 'FIREBASE_CLIENT_EMAIL'
      : 'DEV_FIREBASE_CLIENT_EMAIL'
  );
}

if (!privateKeyValue) {
  missingVariables.push(
    isProduction
      ? 'FIREBASE_PRIVATE_KEY'
      : 'DEV_FIREBASE_PRIVATE_KEY'
  );
}

if (missingVariables.length > 0) {
  throw new Error(
    `Missing Firebase Admin variables for ${environment}: ${missingVariables.join(', ')}`
  );
}

const privateKey = privateKeyValue
  .replace(/^"(.*)"$/s, '$1')
  .replace(/\\n/g, '\n');

const app =
  getApps().length > 0
    ? getApp()
    : initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey
        }),
        projectId
      });

const auth = getAuth(app);
const db = getFirestore(app);

module.exports = {
  app,
  auth,
  db,
  FieldValue,
  Timestamp
};