import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

/**
 * Parse Firebase auth token
 * @param req
 * @param param
 * @returns
 */
export function getAuthToken(
  req: functions.https.Request,
  param = "authorization"
) {
  const authHeader = req.headers[param];

  if (!authHeader) {
    return null;
  }

  if (typeof authHeader === "string") {
    if (authHeader.indexOf("Bearer") > -1) {
      return authHeader.split("Bearer ")[1];
    }
    return null;
  }

  // Possible to get multiple headers with the same name
  for (const header of authHeader) {
    // Just return the first one.
    if (header.indexOf("Bearer") > -1) {
      return header.split("Bearer ")[1];
    }
  }
  return null;
}

/**
 * IF there's no auth token then respond with 401.
 * @param req
 * @param res
 * @returns
 */
export function getAuthTokenOr401(
  req: functions.https.Request,
  res: functions.Response<any>
) {
  const token = getAuthToken(req);
  if (!token) {
    res.status(401).json({ error: "missing authorization" });
    return null;
  }
  return token;
}

/**
 * Use firebase to verify auth or sends a 401.
 * @param req
 * @param res
 * @returns uid if token is valid
 */
export async function verifyAndGetUid(
  req: functions.https.Request,
  res: functions.Response<any>
) {
  const tokenId = getAuthTokenOr401(req, res);

  if (!tokenId) {
    return null;
  }

  try {
    const verifyTokenRes = await admin.auth().verifyIdToken(tokenId);
    if (!verifyTokenRes || !verifyTokenRes.uid) {
      // In theory this shouldn't happen.

      res.status(401).json({ error: "invalid authorization" });
      return null;
    }
    return verifyTokenRes.uid;
  } catch (error) {
    res.status(401).json({ error: "invalid authorization" });
    return null;
  }
}
