import { api } from "./api";

export const subusersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSubusers: builder.query({
      query: () => `data/inheritors`,
    }),
    addSubuser : builder.mutation({
      query: (body) => ({
        url: "grantAccess",
        method: 'POST',
        body,
      })
    }),
    editSubuser: builder.mutation({
      query: (body) => ({
          url: "grantAccess",
          method: 'PATCH',
          body,
        })
    }),
    deleteSubuser: builder.mutation({
      query: (body) => ({
          url: "grantAccess",
          method: 'DELETE',
          body,
        })
    })
  }),
})

export const { useGetSubusersQuery, useAddSubuserMutation, useEditSubuserMutation, useDeleteSubuserMutation } = subusersApi
