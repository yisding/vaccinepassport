import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";

interface TicketData {
  hash: string;
  code: string;
  expiration: number;
}

export default function ViewImage() {
  const router = useRouter();
  const { slug } = router.query;
  const [ticketData, setTicketData] = useState<TicketData>(null);
  const [approved, setApproved] = useState<string>(null);
  const [ticketError, setTicketError] = useState<string>(null);

  let image = null;
  if (typeof slug === "object") {
    image = slug.join("/");
  }

  useEffect(() => {
    (async () => {
      if (!image) {
        return;
      }

      const response = await fetch(
        process.env.NEXT_PUBLIC_FIRE_FUNCTIONS_HOST +
          "getTicket" +
          `?image=${encodeURIComponent(image)}`,
        {
          method: "POST",
        }
      );

      const ticket = await response.json();

      if (ticket.error) {
        setTicketError(ticket.error);
      } else {
        setTicketData(ticket);
      }
    })();
  }, [image]);

  useEffect(() => {
    if (!image) {
      return;
    }

    const checkAccess = async () => {
      if (ticketData) {
        const response = await fetch(
          process.env.NEXT_PUBLIC_FIRE_FUNCTIONS_HOST +
            "canAccessImage" +
            `?image=${encodeURIComponent(image)}&hash=${encodeURIComponent(
              ticketData.hash
            )}`
        );

        const canAccessImage = await response.json();
        setApproved(canAccessImage.approved);

        if (canAccessImage.approved === "not yet") {
          setTimeout(checkAccess, 5 * 1000);
        }
      }
    };

    checkAccess();
  }, [image, ticketData]);

  if (!image) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-full">
      <Head>
        <title>DIY Vaccine Passport</title>
        <link rel="icon" href="/vaccine.png" />
      </Head>
      <Header title="Vaccine Passport Viewer" />
      <div className="flex-grow">
        {ticketData ? (
          <div className="text-2xl p-8 text-center">
            {(!approved || approved === "not yet") && ticketData && (
              <div>
                <p>Requesting Access.</p>
                <p>Your code is {ticketData.code}.</p>
              </div>
            )}
            {approved && approved === "invalid ticket" && (
              <div>Please rescan the QR code.</div>
            )}
            {approved && approved === "approved" && (
              <img
                src={
                  process.env.NEXT_PUBLIC_FIRE_FUNCTIONS_HOST +
                  "downloadImage" +
                  `?image=${encodeURIComponent(
                    image
                  )}&hash=${encodeURIComponent(ticketData.hash)}`
                }
              />
            )}
          </div>
        ) : (
          <div className="pt-8 text-2xl text-center">Loading...</div>
        )}
      </div>
      <Footer />
    </div>
  );
}
