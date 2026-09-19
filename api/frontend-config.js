module.exports = function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Method Not Allowed'
    });
  }

  const isProduction = process.env.VERCEL_ENV === 'production';

  const prefix = isProduction ? 'FIREBASE_' : 'DEV_FIREBASE_';

  const config = {
    apiKey: process.env[`${prefix}API_KEY`],
    authDomain: process.env[`${prefix}AUTH_DOMAIN`],
    projectId: process.env[`${prefix}PROJECT_ID`],
    storageBucket: process.env[`${prefix}STORAGE_BUCKET`],
    messagingSenderId: process.env[`${prefix}MESSAGING_SENDER_ID`],
    appId: process.env[`${prefix}APP_ID`]
  };

  const missing = Object.entries(config)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    console.error(
      `Missing Firebase frontend config: ${missing.join(', ')}`
    );

    return res.status(500).json({
      error: 'Missing Firebase frontend configuration.',
      missing
    });
  }

  return res.status(200).json(config);
};