import { setAlerts } from "@/storage/alertSlice";
import { useDispatch } from "@/storage/store";
import { AlertColor } from "@mui/material";
import React from "react";

const useAlert = (type: AlertColor, text: string) => {
  const dispatch = useDispatch();
  return dispatch(setAlerts({ type, text }));
};

export default useAlert;
