import { api } from "./api";

export const profilesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: ({ rest_id }) => `profile/?restaurant_id=${rest_id}`,
      providesTags: ["Profiles"],
    }),
    addProfile: builder.mutation({
      query: (body) => ({
        url: "profile",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Profiles"],
    }),
    editProfile: builder.mutation({
      query: (body) => ({
        url: "profile",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Profiles"],
    }),
    deleteProfile: builder.mutation({
      query: (body) => ({
        url: "profile",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Profiles"],
    }),
  }),
});

export const {
  useAddProfileMutation,
  useDeleteProfileMutation,
  useEditProfileMutation,
  useGetProfileQuery,
} = profilesApi;
