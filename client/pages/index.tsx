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
interface User {
  image: string;
  tickets: {
    [hash: string]: Ticket;
  };
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

function ExistingImage({ imageUrl, token }) {
  const [tickets, setTickets] = useState(null);

  useEffect(() => {
    const db = firebase.firestore();
    const userDocRef = db
      .collection("users")
      .doc(firebase.auth().currentUser.uid);

    userDocRef.onSnapshot((doc) => {
      const userData = doc.data() as User;
      setTickets(userData.tickets);
    });
  }, []);

  const qrUrl = new URL(imageUrl, location.href);

  return (
    <div>
      <div>{tickets && <div></div>}</div>
      <div>
        <QR url={qrUrl.href} />
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

      <main>
        {fetchingUrl ? (
          <div>Loading...</div>
        ) : imageUrl ? (
          <ExistingImage imageUrl={imageUrl} token={token} />
        ) : (
          <NoImage setImageUrl={setImageUrl} token={token} />
        )}
      </main>

      <footer></footer>
    </div>
  );
}
