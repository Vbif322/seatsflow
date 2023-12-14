import { api } from "./api";

export const profilesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addProfile: builder.mutation({
      query: (body) => ({
        url: "profile",
        method: "POST",
        body,
      }),
    }),
    editProfile: builder.mutation({
      query: (body) => ({
        url: "profile",
        method: "PATCH",
        body,
      }),
    }),
    deleteProfile: builder.mutation({
      query: (body) => ({
        url: "profile",
        method: "DELETE",
        body,
      }),
    }),
  }),
});

export const {
  useAddProfileMutation,
  useDeleteProfileMutation,
  useEditProfileMutation,
} = profilesApi;
