import QRCode, { QRCodeToDataURLOptions } from "qrcode";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";

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

  return <img src={dataUrl} />;
}

function NoImage() {
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
      onSubmit={() => {
        const file = imageInput.current.files[0];

        const formData = new FormData();
        formData.append("file", file);

        fetch("http://www.example.net", { method: "POST", body: formData });
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
        <input type="submit" value="Upload" disabled={!imageDataUrl} />
      </div>
    </form>
  );
}

function ExistingImage({ tickets }) {
  return (
    <div>
      <QR url="https://www.google.com" />
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <Head>
        <title>DIY Vaccine Passport</title>
        <link rel="icon" href="/vaccine.png" />
      </Head>

      <main>
        <NoImage />
      </main>

      <footer></footer>
    </div>
  );
}
