import QRCode, { QRCodeToDataURLOptions } from "qrcode";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import firebase from "../shared/firebase";

const apis = [
  "approveTicket",
  "canAccessImage",
  "deleteUser",
  "downloadImage",
  "getTicket",
  "getUrl",
  "uploadImage",
];

interface Ticket {
  expiration: firebase.firestore.Timestamp;
  code: number;
  approved: boolean;
}

interface Tickets {
  [hash: string]: Ticket;
}
interface User {
  image: string;
  tickets: Tickets;
}

function QR({ url }: { url: string }) {
  const [dataUrl, setDataUrl] = useState("");

  useEffect(() => {
    const opts: QRCodeToDataURLOptions = {
      errorCorrectionLevel: "H",
      type: "image/png",
      scale: 8,
      color: {
        dark: "#059669FF",
      },
    };

    QRCode.toDataURL(url, opts, (err, url) => {
      if (err) throw err;
      setDataUrl(url);
    });
  }, [url]);

  return <img src={dataUrl} alt="Scan QR Code to see vaccination card." />;
}

function NoImage({
  token,
  setImageUrl,
}: {
  token: string;
  setImageUrl: (imageUrl: string) => void;
}) {
  const imageInput = useRef<HTMLInputElement>(null);
  const [imageDataUrl, setImageDataUrl] = useState<string>(null);

  function handleChange() {
    const file = imageInput.current.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImageDataUrl(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        const file = imageInput.current.files[0];
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(
          process.env.NEXT_PUBLIC_FIRE_FUNCTIONS_HOST + "uploadImage",
          {
            method: "POST",
            body: formData,
            headers: new Headers({
              Authorization: `Bearer ${token}`,
            }),
          }
        );
        const json = await response.json();
        const imageUrl = json.payload.imageUrl;
        setImageUrl(imageUrl);
      }}
    >
      <div>
        <label htmlFor="image">Upload Your Vaccine Card:</label>
      </div>
      <div>
        <input
          name="image"
          type="file"
          accept="image/png, image/jpeg"
          ref={imageInput}
          onChange={handleChange}
        />
      </div>
      <div>{imageDataUrl && <img src={imageDataUrl} />}</div>
      <div>
        <input
          type="submit"
          value="Upload"
          disabled={!token || !imageDataUrl}
        />
      </div>
    </form>
  );
}

function ExistingImage({ imageUrl, setImageUrl, token }) {
  const [tickets, setTickets] = useState<Tickets>(null);
  console.log("first tickets");
  console.log(tickets);
  const [processedTickets, setProcessedTickets] = useState<string[]>([]);
  const [deletePending, setDeletePending] = useState(false);

  const uid = firebase.auth().currentUser.uid;

  useEffect(() => {
    const db = firebase.firestore();
    const userDocRef = db.collection("users").doc(uid);
    console.log("outside snapshot tickets");
    console.log(tickets);

    const unsub = userDocRef.onSnapshot((doc) => {
      const now = Date.now();
      const userData = doc.data() as User;

      if (!userData) {
        return;
      }

      const userTickets = userData.tickets;

      console.log("tickets");
      console.log(tickets);
      console.log("processedTickets");
      console.log(processedTickets);
      const processedSet = new Set(processedTickets);
      console.log("processedSet");
      console.log(processedSet);
      // const hashes = Object.keys(userTickets);
      // for (const hash of hashes) {
      //   if (userTickets[hash].expiration.toMillis() < now) {
      //     processedSet.add(hash);
      //   }
      // }

      setProcessedTickets([...processedSet]);
      setTickets(userTickets);
    });

    return () => {
      console.log("unsubscribe");
      unsub();
    };
  }, [uid]);

  const qrUrl = new URL(imageUrl, location.href);

  const getNextTicket = () => {
    if (!tickets) {
      return {
        nextHash: null,
        nextExpiration: null,
        nextCode: null,
      };
    }

    const hashes = Object.keys(tickets);
    const processedSet = new Set(processedTickets);
    let nearestHash = null;
    let nearestExpiration = null;
    let nearestCode = null;
    for (const hash of hashes) {
      if (!processedSet.has(hash)) {
        if (
          !nearestExpiration ||
          tickets[hash].expiration.toMillis() < nearestExpiration
        ) {
          nearestExpiration = tickets[hash].expiration.toMillis();
          nearestHash = hash;
          nearestCode = tickets[hash].code;
        }
      }
    }

    return {
      nextHash: nearestHash,
      nextExpiration: nearestExpiration,
      nextCode: nearestCode,
    };
  };

  const { nextHash, nextExpiration, nextCode } = getNextTicket();

  return (
    <div>
      <div>
        {nextHash && (
          <div>
            Request to view your image. Code: {nextCode}{" "}
            <button
              onClick={async () => {
                const response = await fetch(
                  process.env.NEXT_PUBLIC_FIRE_FUNCTIONS_HOST +
                    "approveTicket" +
                    `?hash=${nextHash}`,
                  {
                    method: "POST",
                    headers: new Headers({
                      Authorization: `Bearer ${token}`,
                    }),
                  }
                );

                const processedSet = new Set(processedTickets);
                processedSet.add(nextHash);
                setProcessedTickets([...processedSet]);
              }}
            >
              Approve
            </button>{" "}
            <button
              onClick={() => {
                const processedSet = new Set(processedTickets);
                processedSet.add(nextHash);
                setProcessedTickets([...processedSet]);
              }}
            >
              Deny
            </button>
          </div>
        )}
      </div>
      <div>
        <QR url={qrUrl.href} />
      </div>
      <button
        onClick={async () => {
          setDeletePending(true);
          const response = await fetch(
            process.env.NEXT_PUBLIC_FIRE_FUNCTIONS_HOST + "deleteUser",
            {
              method: "POST",
              headers: new Headers({
                Authorization: `Bearer ${token}`,
              }),
            }
          );

          setImageUrl(null);
        }}
        disabled={deletePending}
      >
        Delete Image and Data
      </button>
    </div>
  );
}

export default function Home() {
  const [token, setToken] = useState<string>(null);

  const [imageUrl, setImageUrl] = useState(null);
  const [fetchingUrl, setFetchingUrl] = useState(true);

  useEffect(() => {
    (async () => {
      const credential = await firebase.auth().signInAnonymously();
      const idToken = await credential.user.getIdToken();
      setToken(idToken);

      const response = await fetch(
        process.env.NEXT_PUBLIC_FIRE_FUNCTIONS_HOST + "getUrl",
        {
          method: "GET",
          headers: new Headers({
            Authorization: `Bearer ${idToken}`,
          }),
        }
      );
      const json = await response.json();
      const imageUrl = json.payload.imageUrl;
      setImageUrl(imageUrl);
      setFetchingUrl(false);
    })();
  }, []);

  return (
    <div>
      <Head>
        <title>DIY Vaccine Passport</title>
        <link rel="icon" href="/vaccine.png" />
      </Head>

      <main>
        {fetchingUrl ? (
          <div>Loading...</div>
        ) : imageUrl ? (
          <ExistingImage
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            token={token}
          />
        ) : (
          <NoImage setImageUrl={setImageUrl} token={token} />
        )}
      </main>

      <footer></footer>
    </div>
  );
}
