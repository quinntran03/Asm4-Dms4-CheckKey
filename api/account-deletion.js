const { auth, db, Timestamp } = require('./firebase-admin');

const REQUEST_COLLECTION = 'accountDeletionRequests';
const GRACE_PERIOD_MS = 72 * 60 * 60 * 1000;
const RECENT_AUTH_SECONDS = 5 * 60;

function getBearerToken(req) {
  const authorization = req.headers.authorization;

  if (
    typeof authorization !== 'string' ||
    !authorization.startsWith('Bearer ')
  ) {
    return null;
  }

  const token = authorization.slice(7).trim();
  return token || null;
}

async function verifyFirebaseToken(req, res) {
  const token = getBearerToken(req);

  if (!token) {
    res.status(401).json({
      error: 'Missing authorization token.'
    });
    return null;
  }

  try {
    return await auth.verifyIdToken(token);
  } catch {
    res.status(401).json({
      error: 'Invalid or expired authorization token.'
    });
    return null;
  }
}

function sendDeletionStatus(res, data) {
  if (!data) {
    return res.status(200).json({
      pending: false
    });
  }

  if (
    !data.deleteAfter ||
    typeof data.deleteAfter.toMillis !== 'function'
  ) {
    return res.status(500).json({
      error: 'Invalid account deletion request.'
    });
  }

  const deleteAfterMilliseconds = data.deleteAfter.toMillis();

  return res.status(200).json({
    pending: true,
    status: data.status,
    deleteAfter: data.deleteAfter.toDate().toISOString(),
    canCancel:
      data.status === 'pending' &&
      Date.now() < deleteAfterMilliseconds
  });
}

module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');

    return res.status(405).json({
      error: 'Method Not Allowed'
    });
  }

  const decodedToken = await verifyFirebaseToken(req, res);

  if (!decodedToken) {
    return;
  }

  const requestReference = db
    .collection(REQUEST_COLLECTION)
    .doc(decodedToken.uid);

  try {
    if (req.method === 'GET') {
      const snapshot = await requestReference.get();

      return sendDeletionStatus(
        res,
        snapshot.exists ? snapshot.data() : null
      );
    }

    let body = req.body;

    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        return res.status(400).json({
          error: 'Invalid JSON body.'
        });
      }
    }

    if (
      !body ||
      typeof body !== 'object' ||
      Array.isArray(body)
    ) {
      return res.status(400).json({
        error: 'Invalid request body.'
      });
    }

    const { action } = body;

    if (action !== 'schedule' && action !== 'cancel') {
      return res.status(400).json({
        error: 'Invalid action.'
      });
    }

    if (action === 'schedule') {
      if (decodedToken.email_verified !== true) {
        return res.status(403).json({
          error: 'Email is not verified.'
        });
      }

      const currentTimeSeconds = Math.floor(Date.now() / 1000);
      const authenticationTime = Number(decodedToken.auth_time);
      const authenticationAge =
        currentTimeSeconds - authenticationTime;

      if (
        !Number.isFinite(authenticationTime) ||
        authenticationAge < 0 ||
        authenticationAge > RECENT_AUTH_SECONDS
      ) {
        return res.status(401).json({
          error: 'Recent authentication is required.'
        });
      }

      const requestData = await db.runTransaction(
        async transaction => {
          const snapshot = await transaction.get(requestReference);

          if (snapshot.exists) {
            return snapshot.data();
          }

          const requestedAt = Timestamp.now();
          const deleteAfter = Timestamp.fromMillis(
            requestedAt.toMillis() + GRACE_PERIOD_MS
          );

          const newRequest = {
            status: 'pending',
            requestedAt,
            deleteAfter,
            updatedAt: requestedAt,
            attempts: 0,
            lastErrorCode: null,
            version: 1
          };

          transaction.create(requestReference, newRequest);

          return newRequest;
        }
      );

      return sendDeletionStatus(res, requestData);
    }

    const cancellationResult = await db.runTransaction(
      async transaction => {
        const snapshot = await transaction.get(requestReference);

        if (!snapshot.exists) {
          return {
            result: 'not-found'
          };
        }

        const requestData = snapshot.data();

        if (requestData.status !== 'pending') {
          return {
            result: 'processing'
          };
        }

        if (
          !requestData.deleteAfter ||
          typeof requestData.deleteAfter.toMillis !== 'function'
        ) {
          return {
            result: 'invalid'
          };
        }

        if (
          Timestamp.now().toMillis() >=
          requestData.deleteAfter.toMillis()
        ) {
          return {
            result: 'expired'
          };
        }

        transaction.delete(requestReference);

        return {
          result: 'cancelled'
        };
      }
    );

    if (cancellationResult.result === 'processing') {
      return res.status(409).json({
        error: 'Account deletion is already being processed.'
      });
    }

    if (cancellationResult.result === 'expired') {
      return res.status(409).json({
        error: 'The cancellation period has ended.'
      });
    }

    if (cancellationResult.result === 'invalid') {
      return res.status(500).json({
        error: 'Invalid account deletion request.'
      });
    }

    return res.status(200).json({
      success: true,
      pending: false
    });
  } catch (error) {
    console.error(
      'Account deletion endpoint failed:',
      error && (error.code || error.name)
        ? error.code || error.name
        : 'unknown-error'
    );

    return res.status(500).json({
      error: 'Unable to process account deletion request.'
    });
  }
};