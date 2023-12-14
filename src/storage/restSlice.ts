import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  message: "",
  restaurants: [],
  halls: [],
  tables: [],
};

export const restSlice = createSlice({
  name: "rest",
  initialState,
  reducers: {
    setTablesRedux: (state, action) => {
      console.log(action);
    },
  },
});

export const { setTablesRedux } = restSlice.actions;

export default restSlice.reducer;
