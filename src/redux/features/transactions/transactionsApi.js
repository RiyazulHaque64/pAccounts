import { apiSlice } from "../api/apiSlice";

const transactionsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: (email) => ({
        url: `/transactions/${email}`,
      }),
      providesTags: ["transactions"],
    }),
    addTransaction: builder.mutation({
      query: (data) => ({
        url: "/transaction",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["transactions"],
    }),
    updateTransaction: builder.mutation({
      query: ({ id, updatedTransaction }) => ({
        url: `/transaction/${id}`,
        method: "PUT",
        body: updatedTransaction,
      }),
    }),
    deleteTransaction: builder.mutation({
      query: (id) => ({
        url: `/transaction/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["transactions"],
    }),
  }),
});

export const {
  useAddTransactionMutation,
  useGetTransactionsQuery,
  useDeleteTransactionMutation,
  useUpdateTransactionMutation,
} = transactionsApi;
