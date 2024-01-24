import { closeAlert, setAlerts } from "@/storage/alertSlice";
import { useDispatch, useSelector } from "@/storage/store";
import { Alert, Button } from "@mui/material";
import React, { useEffect } from "react";

const AlertPopup = () => {
  const alertArray = useSelector((state) => state.alert.alertArray);
  const dispatch = useDispatch();

  useEffect(() => {
    if (alertArray.length > 0) {
      setTimeout(() => {
        dispatch(closeAlert(alertArray.length - 1));
      }, 5000);
    }
  }, [alertArray]);

  const closeAlertHandler = (i: number) => {
    dispatch(closeAlert(i));
  };

  return (
    <>
      {alertArray.map((alert, i) => {
        return (
          <Alert
            key={i}
            severity={alert.type}
            onClose={() => closeAlertHandler(i)}
            sx={{
              position: "absolute",
              zIndex: 1500,
              left: 50,
              bottom: 100 + 60 * i,
            }}
          >
            {alert.text}
          </Alert>
        );
      })}
    </>
  );
};

export default AlertPopup;
