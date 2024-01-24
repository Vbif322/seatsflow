import { api } from "./api";

export const subusersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSubusers: builder.query({
      query: () => `data/inheritors`,
      providesTags: ["Subusers"],
    }),
    addSubuser: builder.mutation({
      query: (body) => ({
        url: "grantAccess",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Subusers"],
    }),
    editSubuser: builder.mutation({
      query: (body) => ({
        url: "grantAccess",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Subusers"],
    }),
    deleteSubuser: builder.mutation({
      query: (body) => ({
        url: "grantAccess",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Subusers"],
    }),
  }),
});

export const {
  useGetSubusersQuery,
  useAddSubuserMutation,
  useEditSubuserMutation,
  useDeleteSubuserMutation,
} = subusersApi;
