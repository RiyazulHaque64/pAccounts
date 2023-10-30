import { apiSlice } from "../api/apiSlice";

const accountsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAccounts: builder.query({
      query: (email) => `/accounts/${email}`,
      keepUnusedDataFor: 600,
      providesTags: ["accounts"],
    }),
    getAccount: builder.query({
      query: ({ user, accName }) => ({
        url: `/account/${user}?accountName=${accName}`,
      }),
    }),
    addAccount: builder.mutation({
      query: (data) => ({
        url: "/account",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["accounts"],
    }),
    updateAccount: builder.mutation({
      query: ({ accountId, data }) => ({
        url: `/account/${accountId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["accounts"],
    }),
    deleteAccount: builder.mutation({
      query: (accountId) => ({
        url: `/account/${accountId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["accounts"],
    }),
  }),
});

export const {
  useAddAccountMutation,
  useGetAccountsQuery,
  useUpdateAccountMutation,
  useDeleteAccountMutation,
  useGetAccountQuery,
} = accountsApi;
