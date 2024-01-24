import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AppState } from "../store";
import { HYDRATE } from "next-redux-wrapper";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as AppState).token.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    } else if (localStorage.getItem("token")) {
      headers.set("authorization", `Bearer ${localStorage.getItem("token")}`);
    }
    return headers;
  },
});

export const api = createApi({
  reducerPath: "api",
  baseQuery,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ["Bookings", "Subusers", "Profiles", "orders"],
  endpoints: () => ({}),
});
