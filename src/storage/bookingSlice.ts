import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchBooking = createAsyncThunk(
  "booking/fetchBooking",
  async function (
    restaurantID,
    { rejectWithValue, fulfillWithValue, extra: api } : {rejectWithValue: any, fulfillWithValue : any, extra: any}
  ) {
    try {
      const data = await api.getBookings(restaurantID);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  futureBookings: [],
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    resetBookings: (state) => {
      state.futureBookings = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooking.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooking.fulfilled, (state, action) => {
        state.futureBookings = action.payload.futureBookings;
        state.loading = false;
      })
      .addMatcher(
        (action) => action.type.endsWith("rejected"),
        (state, action) => {
          state.error = action.payload?.error;
          state.loading = false;
        }
      );
  },
});

export const { resetBookings } = bookingSlice.actions;

export default bookingSlice.reducer;
