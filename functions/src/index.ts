import * as Busboy from "busboy";
const cors = require("cors")({ origin: true });
import * as crypto from "crypto";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { v4 as uuidv4 } from "uuid";

import { verifyAndGetUid } from "./utils";

admin.initializeApp();
const FieldValue = admin.firestore.FieldValue;

interface Ticket {
  expiration: FirebaseFirestore.Timestamp;
  code: number;
  approved: boolean;
}
interface User {
  image: string;
  tickets: {
    [hash: string]: Ticket;
  };
}

export const testFirebase = functions.https.onRequest(async (req, res) => {
  functions.logger.info("testFirebase");
  const userDoc = await admin
    .firestore()
    .collection("users")
    .doc("jY6M2DYq3MWfzWyALY2W")
    .get();
  const userData: User | undefined = userDoc.data() as User;
  functions.logger.debug(userData);
  const time =
    userData.tickets["5894f3f6-2323-4eb7-a903-2bd08fd9974c"].expiration;
  functions.logger.debug(
    `seconds: ${time.seconds} nano: ${
      time.nanoseconds
    } valueOf: ${time.valueOf()}`
  );
  res.end();
  return;
});

/**
 * Here's the flow:
 *
 * 1. The uploader anonymously authenticates and uploads their photo to
 * firebase.
 * 2. The uploader is given a QR code which contains a link where others can go
 * to download the image. The QR code has a GUID in the URL so it'll be hard
 * to brute force the actual URLs.
 * 3. When someone scans the QR code they are taken to a site where a random
 * 5 digit number is generated. That random 5 digit number is a representation
 * of their access token. The actual access token is 128 bits.
 * 4. On the uploader's phone, firebase sends them a notification that someone
 * is looking to get access to their photo. The user can check that the five
 * digit code matches the person that they're trying to give their photo to and
 * then accept the request, or reject it if the codes don't match.
 * Requests automatically time out after 5 minutes, so the user won't have a lot
 * of extraneous requests to go through.
 * 5. Once the uploader approves the code, the token can be used to download
 * a copy of the image. If the request is close to timing out, the expiration is
 * automatically extended by a minute.
 */

const makeImagePath = (uid: string, uploadname: string) => {
  return `images/${uid}/${uploadname}`;
};

const parseImagePath = (imagepath: string) => {
  if (!imagepath.startsWith("images/")) {
    return null;
  }
  const parts = imagepath.split("/");
  if (parts.length !== 3) {
    return null;
  }

  return { uid: parts[1], uploadname: parts[2] };
};

/**
 * When the user gets an image, it's associated with their account. If they
 * already have an image then the current image is replaced with the new one.
 * We return a uuid which is specific to this particular image. The uuid cannot
 * be used with another image that is uploaded.
 *
 * Constraints: we take in png and jpg files that are 9MB or less.
 *
 * In the future, we will be able to accept other files like HEIC and WebP and
 * convert them to jpg when necessary.
 */
export const uploadImage = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    functions.logger.info("uploadImage");

    if (req.method !== "POST") {
      // 405 is method not allowed.
      return res.status(405).end();
    }

    const uid = await verifyAndGetUid(req, res);
    if (!uid) {
      return;
    }

    const busboy = new Busboy({
      headers: req.headers,
      limits: {
        // We currently don't have any fields, but we might in the future.
        fields: 20,
        files: 1,
        fileSize: 9 * 1024 * 1024,
      },
    });

    const fields: { [field: string]: string } = {};
    busboy.on("field", (fieldname, val) => {
      fields[fieldname] = val;
    });

    const uploads: { [fieldname: string]: string } = {};

    const fileWrites: Promise<any>[] = [];

    const bucket = admin.storage().bucket();

    let invalidMime = false;
    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
        file.resume();
        invalidMime = true;

        return;
      }

      let uploadname = uuidv4();

      if (mimetype === "image/jpeg") {
        uploadname = uploadname + ".jpg";
      } else if (mimetype === "image/png") {
        uploadname = uploadname + ".png";
      }

      const filepath = makeImagePath(uid, uploadname);
      uploads[fieldname] = filepath;
      const writeStream = bucket.file(filepath).createWriteStream();
      file.pipe(writeStream);

      const promise = new Promise((resolve, reject) => {
        file.on("end", () => {
          writeStream.end();
        });
        writeStream.on("finish", resolve);
        writeStream.on("error", reject);
      });

      fileWrites.push(promise);
    });

    let fieldsLimit = false;
    busboy.on("fieldsLimit", async () => {
      fieldsLimit = true;
    });

    let filesLimit = false;
    busboy.on("filesLimit", async () => {
      filesLimit = true;
    });

    busboy.on("finish", async () => {
      await Promise.all(fileWrites);

      if (invalidMime || fieldsLimit || filesLimit) {
        res.status(400).json({ error: "invalid upload" });

        return;
      }

      const keys = Object.keys(uploads);
      const numUploads = keys.length;
      if (numUploads !== 1) {
        if (numUploads > 1) {
          functions.logger.error(
            `For some reason user ${uid} was able to upload ${numUploads} files`
          );
        }
        res.status(400).json({ error: "invalid upload" });
        return;
      }

      const userDocRef = admin.firestore().collection("users").doc(uid);
      const userDoc = await userDocRef.get();
      const userData = userDoc.data() as User;
      let oldFile = null;
      if (userData) {
        // userDoc exists
        functions.logger.debug("userData", userData);
        oldFile = userData.image;
        // Clear old tickets as well.
        await userDocRef.update({ image: uploads[keys[0]], tickets: {} });

        const file = bucket.file(oldFile);
        await file.delete();
      } else {
        await userDocRef.set({ image: uploads[keys[0]], tickets: {} });
      }

      res.json({ payload: { imageUrl: "/view/" + uploads[keys[0]] } });
    });

    // Have busboy process
    busboy.end(req.rawBody);
  });
});

/**
 * Get the image URL for this user.
 */
export const getUrl = functions.https.onRequest(async (req, res) => {
  functions.logger.info("getUrl");
  const uid = await verifyAndGetUid(req, res);

  if (!uid) {
    return;
  }

  const userDocRef = admin.firestore().collection("users").doc(uid);
  const userDoc = await userDocRef.get();
  const userData = userDoc.data() as User;

  res.json({ payload: { imageUrl: "/view/" + userData.image } });

  return;
});

/**
 * Get a token and a verification code to download someone's image.
 *
 * The user will get a notification and have to decide whether or not to
 * approve the token.
 */
export const getTicket = functions.https.onRequest(async (req, res) => {
  functions.logger.info("getTicket");

  if (req.method !== "POST") {
    // 405 is method not allowed.
    return res.status(405).end();
  }

  const image = req.query.image;
  if (!image || typeof image !== "string") {
    res.status(400).json({ error: "missing image" });
    return;
  }

  const parts = parseImagePath(image);
  if (!parts) {
    res.status(400).json({ error: "missing image" });
    return;
  }

  const sharerUid = parts.uid;

  const sharerDocRef = admin.firestore().collection("users").doc(sharerUid);
  const sharerDoc = await sharerDocRef.get();
  const sharerData = sharerDoc.data() as User;

  if (image !== sharerData.image) {
    res.json({ error: "incorrect image, retry" });
    return;
  }

  const now = Date.now();
  const expiration = now + 5 * 60 * 1000; // 5 minutes
  const code = crypto.randomInt(10000, 100000);
  const hash = crypto.randomBytes(16).toString("hex");
  const ticket: Ticket = {
    code,
    expiration: FirebaseFirestore.Timestamp.fromMillis(expiration),
    approved: false,
  };
  await sharerDocRef.update({ [`tickets.${hash}`]: ticket });

  res.json({ hash, code, expiration });
});

/**
 * Approve a ticket.
 * This could be done on the client side, but for consistency it's done in a
 * function here.
 */
export const approveTicket = functions.https.onRequest(async (req, res) => {
  functions.logger.info("getToken");
  const hash = req.query.hash;

  const uid = await verifyAndGetUid(req, res);
  if (!uid) {
    return;
  }

  if (!hash || typeof hash !== "string") {
    res.status(400).json({ error: "missing hash" });
    return;
  }

  const userDocRef = admin.firestore().collection("users").doc(uid);
  const userDoc = await userDocRef.get();
  const userData = userDoc.data() as User;

  const ticket = userData.tickets[hash];
  if (ticket) {
    const now = Date.now();
    const expirationTime = ticket.expiration.toMillis();
    if (expirationTime > now) {
      const oneMinuteFromNow = now + 1 * 60 * 1000;
      if (expirationTime < oneMinuteFromNow) {
        await userDocRef.update({
          [`tickets.${hash}.approved`]: true,
          [`tickets.${hash}.expiration`]: FirebaseFirestore.Timestamp.fromMillis(
            oneMinuteFromNow
          ),
        });
      } else {
        await userDocRef.update({ [`tickets.${hash}.approved`]: true });
      }
      res.json({ approved: true });
      return;
    } else {
      await userDocRef.update({ [`tickets.${hash}`]: FieldValue.delete() });
      res.json({ error: "ticket expired" });
      return;
    }
  }
});

const isApproved = async (sharerUid: string, hash: string) => {
  const sharerDocRef = admin.firestore().collection("users").doc(sharerUid);
  const sharerDoc = await sharerDocRef.get();
  const sharerData = sharerDoc.data() as User;

  const ticket = sharerData.tickets[hash];

  if (!ticket) {
    return "invalid ticket";
  }

  if (ticket.approved) {
    return "approved";
  } else {
    return "not yet";
  }
};

/**
 * We could try to do this via realtime updates, but then we would need to
 * create some kind of publicly available document that the frontend can
 * subscribe to. So it's easier for now for the frontend to just poll this
 * endpoint.
 */
export const canAccessimage = functions.https.onRequest(async (req, res) => {
  const { image, hash } = req.query;

  if (!image || typeof image !== "string") {
    res.status(400).json({ error: "missing image" });
    return;
  }

  if (!hash || typeof hash !== "string") {
    res.status(400).json({ error: "missing hash" });
    return;
  }

  const parts = parseImagePath(image);
  if (!parts) {
    res.status(400).json({ error: "missing image" });
    return;
  }

  const approved = await isApproved(parts.uid, hash);

  res.json({ approved });
});

/**
 * Once you have an approved token, download the image.
 */
export const downloadImage = functions.https.onRequest(async (req, res) => {
  const { image, hash } = req.query;

  if (!image || typeof image !== "string") {
    res.status(400).json({ error: "missing image" });
    return;
  }

  if (!hash || typeof hash !== "string") {
    res.status(400).json({ error: "missing hash" });
    return;
  }

  const parts = parseImagePath(image);
  if (!parts) {
    res.status(400).json({ error: "missing image" });
    return;
  }

  const approved = await isApproved(parts.uid, hash);

  if (approved !== "approved") {
    res.status(500).json({ error: "invalid hash" });
    return;
  }

  const bucket = admin.storage().bucket();
  const readStream = bucket.file(image).createReadStream();
  const stream = readStream.pipe(res);

  await new Promise((resolve, reject) => stream.on("finish", resolve));
});

export const deleteUser = functions.https.onRequest(async (req, res) => {
  const uid = await verifyAndGetUid(req, res);
  if (!uid) {
    return;
  }

  const userDocRef = admin.firestore().collection("users").doc(uid);
  const userDoc = await userDocRef.get();
  const userData = userDoc.data() as User;

  const bucket = admin.storage().bucket();
  const file = bucket.file(userData.image);

  // Delete the firestore first
  await userDocRef.delete();

  // Then delete the image.
  await file.delete();

  res.json({ status: "success" });
});
