import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface TicketData {
  hash: string;
  code: string;
  expiration: number;
}

export default function ViewImage() {
  const router = useRouter();
  const { image } = router.query;
  if (typeof image !== "string") {
    return;
  }

  const [ticketData, setTicketData] = useState<TicketData>(null);
  const [approved, setApproved] = useState<string>(null);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_FIRE_FUNCTIONS_HOST +
          "getTicket" +
          `?image=${encodeURIComponent(image)}`,
        {
          method: "POST",
        }
      );

      const ticket = await response.json();
      setTicketData(ticket);
    })();
  }, []);

  useEffect(() => {
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
          setTimeout(checkAccess, 30 * 1000);
        }
      }
    };

    checkAccess();
  }, [ticketData]);

  return ticketData ? (
    <div>
      {(!approved || approved === "not yet") && (
        <div>Your code: {ticketData.code}</div>
      )}
      {approved && approved === "invalid ticket" && (
        <div>Please rescan the QR code</div>
      )}
      {approved && approved === "approved" && (
        <img
          src={
            process.env.NEXT_PUBLIC_FIRE_FUNCTIONS_HOST +
            "downloadImage" +
            `?image=${encodeURIComponent(image)}&hash=${encodeURIComponent(
              ticketData.hash
            )}`
          }
        />
      )}
    </div>
  ) : (
    <div>Loading...</div>
  );
}
