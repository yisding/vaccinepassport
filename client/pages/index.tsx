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

function Back() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12.588"
      height="20.141"
      viewBox="0 0 12.588 20.141"
    >
      <path
        d="M97.469,59.762a1.8,1.8,0,0,0,0-2.562,1.823,1.823,0,0,0-2.562,0l-6.4,6.4-6.416-6.4a1.811,1.811,0,0,0-2.562,2.562l7.7,7.7a1.823,1.823,0,0,0,2.562,0Z"
        transform="translate(68.624 -78.363) rotate(90)"
        fill="#3b3434"
        stroke="rgba(0,0,0,0)"
        strokeWidth="1"
      />
    </svg>
  );
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
    if (imageInput.current.files.length !== 1) {
      setImageDataUrl(null);
      return;
    }

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
        <input
          id="image"
          type="file"
          accept="image/png, image/jpeg"
          ref={imageInput}
          onChange={handleChange}
          style={{ opacity: 0, position: "absolute", height: 0.1, width: 0.1 }}
        />
        <div>
          {imageDataUrl ? (
            <>
              <div>
                <button
                  className="p-4"
                  onClick={(e) => {
                    e.preventDefault();
                    imageInput.current.value = ""; // This doesn't cause onChange to fire for some reason.
                    setImageDataUrl(null);
                  }}
                >
                  <Back />
                </button>
              </div>
              <div className="text-center pt-12">
                <div className="p-4">
                  <img src={imageDataUrl} />
                </div>
                <div className="mt-8">
                  <input
                    type="submit"
                    value="Create My QR Code"
                    disabled={!token || !imageDataUrl}
                    className="bg-blue-500 rounded-full py-2 px-4 text-white text-lg border-gray-600 border-2"
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="py-32 text-center">
              <div className="text-lg px-10">
                Take a photo or upload a photo of your vaccine card.
              </div>
              <div className="mt-8">
                <label
                  htmlFor="image"
                  className="bg-blue-500 rounded-full py-2 px-4 text-white text-lg border-gray-600 border-2"
                >
                  Upload Card
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}

function ExistingImage({ imageUrl, setImageUrl, token }) {
  const [tickets, setTickets] = useState<Tickets>(null);
  const [processedTickets, setProcessedTickets] = useState<string[]>([]);
  const [deletePending, setDeletePending] = useState(false);

  const uid = firebase.auth().currentUser.uid;

  useEffect(() => {
    const db = firebase.firestore();
    const userDocRef = db.collection("users").doc(uid);
    console.log("outside snapshot tickets");
    console.log(tickets);

    const unsub = userDocRef.onSnapshot((doc) => {
      const userData = doc.data() as User;

      if (!userData) {
        return;
      }

      const userTickets = userData.tickets;

      setProcessedTickets((processed) => {
        const now = Date.now();
        const processedSet = new Set(processed);

        const hashes = Object.keys(userTickets);
        for (const hash of hashes) {
          if (userTickets[hash].expiration.toMillis() < now) {
            processedSet.add(hash);
          }
        }

        return [...processedSet];
      });
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
    <div className="text-center">
      <div className="text-2xl pt-20">Ready to Scan</div>

      <div className="py-4 mx-auto w-56">
        <QR url={qrUrl.href} />
      </div>

      <div>
        {nextHash ? (
          <div>
            <div className="text-2xl px-8">
              <p>You have a request to view your image.</p>
              <p>Code: {nextCode}</p>
            </div>
            <div className="mt-8">
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
                className="bg-blue-500 rounded-full py-2 px-4 text-white text-lg border-gray-600 border-2"
              >
                Approve
              </button>
            </div>
            <div className="mt-4">
              <button
                onClick={() => {
                  const processedSet = new Set(processedTickets);
                  processedSet.add(nextHash);
                  setProcessedTickets([...processedSet]);
                }}
                className="bg-white rounded-full py-2 px-4 text-red-500 text-lg border-gray-600 border-2"
              >
                Deny
              </button>
            </div>
          </div>
        ) : (
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
            className="mt-8 bg-red-600 rounded-full py-2 px-4 text-white text-lg border-gray-600 border-2"
          >
            Delete Image and Data
          </button>
        )}
      </div>
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

      <header className="bg-blue-500 p-4 text-center text-white text-2xl">
        <h1>Vaccine Passport</h1>
      </header>

      <main>
        {fetchingUrl ? (
          <div className="pt-8 text-2xl text-center">Loading...</div>
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

      <footer className="text-center text-sm p-4 pt-8">
        Created by Yi Ding. Designed by Anna Ding.
      </footer>
    </div>
  );
}
