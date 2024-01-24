import { AlertColor } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";

type state = {
  alertArray: { type: AlertColor; text: string }[];
};

const initialState: state = {
  alertArray: [],
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlerts: (state, action) => {
      const { type, text } = action.payload;
      state.alertArray = [...state.alertArray, { text, type }];
    },
    closeAlert: (state, action) => {
      state.alertArray = state.alertArray.filter(
        (_, i) => i !== action.payload
      );
    },
  },
});

export const { setAlerts, closeAlert } = alertSlice.actions;

export default alertSlice.reducer;
