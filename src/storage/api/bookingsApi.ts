import { api } from "./api";

export const bookingsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBookings: builder.query({
      query: (body) => ({
        url: "data/bookings",
        method: "POST",
        body,
      }),
      // providesTags: (result) =>
      // result
      // ? [...result.futureBookings.map(({booking_id}) => ({type: 'Bookings', booking_id})), 'Bookings'] : ['Bookings']
      providesTags: ["Bookings"],
    }),
    getOldBookings: builder.query({
      query: ({ rest_id, limit }) =>
        `data/old_bookings/?restaurant_id=${rest_id}&limit=${limit}`,
    }),
    addBooking: builder.mutation({
      query: (body) => ({
        url: "booking",
        method: "POST",
        body,
      }),
      // invalidatesTags: [{type: 'Bookings', id: 'LIST'}]
      invalidatesTags: ["Bookings"],
    }),
    editBooking: builder.mutation({
      query: (body) => ({
        url: "booking",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Bookings"],
    }),
    deleteBooking: builder.mutation({
      query: (body) => ({
        url: "booking",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Bookings"],
    }),
  }),
});

export const {
  useGetBookingsQuery,
  useGetOldBookingsQuery,
  useAddBookingMutation,
  useEditBookingMutation,
  useDeleteBookingMutation,
} = bookingsApi;
