import admin from 'firebase-admin';
import crypto from 'crypto';

function initFirebaseAdmin() {
  if (admin.apps.length > 0) return true;
  
  try {
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT))
      });
      return true;
    } else if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
        })
      });
      return true;
    } else {
      console.error("[Recovery API] Firebase Admin credentials are not configured.");
      return false;
    }
  } catch (error) {
    console.error('[Recovery API] Firebase admin initialization error:', error.message);
    return false;
  }
}

export default async function handler(req, res) {
  try {
    const isInitialized = initFirebaseAdmin();
    if (!isInitialized) {
      return res.status(500).json({ success: false, error: 'Unable to initialize recovery. Please try again.' });
    }

    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { email } = req.body || {};
    if (!email) {
      return res.status(400).json({ success: false, error: 'Unable to initialize recovery. Please try again.' });
    }

    const db = admin.firestore();
    const normalizedEmail = email.trim().toLowerCase();

    console.log("[Recovery API] normalized email lookup started");

    let uid = null;

    // 1. Try Firebase Admin Auth FIRST
    try {
      const userRecord = await admin.auth().getUserByEmail(normalizedEmail);
      uid = userRecord.uid;
      console.log("[Recovery API] Auth user found");
    } catch (authErr) {
      // 2. Fallback to public_directory if Auth lookup fails
      const emailHash = crypto.createHash('sha256').update(normalizedEmail).digest('hex');
      const dirDoc = await db.collection('public_directory').doc(emailHash).get();
      if (dirDoc.exists) {
        uid = dirDoc.data().uid;
      }
    }

    if (!uid) {
       return res.status(404).json({ success: false, error: 'Unable to initialize recovery. Please try again.' });
    }

    console.log(`[Recovery API] Resolved UID: ${uid}`);
    console.log(`[Recovery API] Vault config path: users/${uid}/vault/config`);
    
    const vaultDoc = await db.collection('users').doc(uid).collection('vault').doc('config').get();
    
    console.log(`[Recovery API] Vault config exists: ${vaultDoc.exists}`);
    
    if (!vaultDoc.exists) {
      return res.status(404).json({ success: false, error: 'Unable to initialize recovery. Please try again.' });
    }

    const vaultData = vaultDoc.data();
    const saltExists = !!vaultData.recoveryVerifierSalt;
    console.log(`[Recovery API] recoveryVerifierSalt exists: ${saltExists}`);

    if (!saltExists) {
      return res.status(404).json({ success: false, error: 'Unable to initialize recovery. Please try again.' });
    }

    return res.status(200).json({
      success: true,
      recoveryVerifierSalt: vaultData.recoveryVerifierSalt
    });

  } catch (error) {
    console.error('[Recovery API] FAILED at unexpected stage:', error.code, error.message);
    return res.status(500).json({ success: false, error: 'Unable to initialize recovery. Please try again.' });
  }
}