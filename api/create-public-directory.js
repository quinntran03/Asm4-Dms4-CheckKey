const admin = require('firebase-admin');
const crypto = require('crypto');

// Initialize Firebase Admin if it hasn't been initialized yet
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        })
    });
}

const db = admin.firestore();

module.exports = async (req, res) => {
    // Only accept POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        // Ensure the request is authenticated via Bearer token
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
        }

        const idToken = authHeader.split('Bearer ')[1];
        
        // Verify the ID token using Firebase Admin SDK
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const uid = decodedToken.uid;
        const email = decodedToken.email;

        if (!email) {
            return res.status(400).json({ error: 'Bad Request: Email not found in token' });
        }

        // Normalize email and generate SHA-256 hash
        const normalizedEmail = email.trim().toLowerCase();
        const emailHash = crypto.createHash('sha256').update(normalizedEmail).digest('hex');

        // Write the public mapping securely using Admin SDK (bypassing Client Security Rules)
        await db.collection('public_directory').doc(emailHash).set({
            uid: uid,
            email: normalizedEmail,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        return res.status(200).json({ success: true });

    } catch (error) {
        console.error('API Error: public_directory mapping failed:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};