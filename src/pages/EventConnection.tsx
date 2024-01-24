import { useSelector } from "@/storage/store";
import React from "react";

const EventConnection = () => {
  const token = useSelector((state) => state.token.token);
  React.useEffect(() => {
    if (token) {
      let eventSource = new EventSource(
        process.env.NEXT_PUBLIC_URL +
          "/stream/?token=" +
          localStorage.getItem("token"),
        {
          withCredentials: true,
        }
      );
      eventSource.onmessage = (e) => {
        console.log(e);
        if (e.data === "message counter - 5") {
          eventSource.close();
        }
      };
    }
  }, [token]);

  return <></>;
};

export default EventConnection;
