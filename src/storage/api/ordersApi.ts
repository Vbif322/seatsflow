import { api } from "./api";

export const ordersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getOrder: builder.query({
      query: (restaurant_id) => ({ url: `order/${restaurant_id}` }),
      providesTags: ["orders"],
    }),
    addOrder: builder.mutation({
      query: (body) => ({
        url: "order",
        method: "POST",
        body,
      }),
      invalidatesTags: ["orders"],
    }),
    deleteOrder: builder.mutation({
      query: (order_id) => ({
        url: `order/${order_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});

export const { useAddOrderMutation, useDeleteOrderMutation, useGetOrderQuery } =
  ordersApi;
