import { api } from "./api";

export const restaurantsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addRestaurant: builder.mutation({
      query: (body) => ({
        url: "restaurants",
        method: "POST",
        body,
      }),
    }),
    editRestaurant: builder.mutation({
      query: (body) => ({
        url: "restaurants",
        method: "PATCH",
        body,
      }),
    }),
    deleteRestaurant: builder.mutation({
      query: (body) => ({
        url: "restaurant",
        method: "DELETE",
        body,
      }),
    }),
  }),
});

export const {
  useAddRestaurantMutation,
  useDeleteRestaurantMutation,
  useEditRestaurantMutation,
} = restaurantsApi;
