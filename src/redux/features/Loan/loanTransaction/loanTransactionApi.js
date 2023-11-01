import { apiSlice } from "../../api/apiSlice";

const loanTransactionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLoanTransactions: builder.query({
      query: (user) => ({
        url: `/loanTransactions/${user}`,
      }),
      providesTags: ["loanTransactions"],
    }),
    addLoanTransaction: builder.mutation({
      query: (data) => ({
        url: "/loanTransaction",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["loanTransactions"],
    }),
    updateLoanTransaction: builder.mutation({
      query: ({ id, data }) => ({
        url: `/loanTransaction/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["loanTransactions"],
    }),
    deleteLoanTransaction: builder.mutation({
      query: (id) => ({
        url: `/loanTransaction/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["loanTransactions"],
    }),
  }),
});

export const {
  useGetLoanTransactionsQuery,
  useAddLoanTransactionMutation,
  useUpdateLoanTransactionMutation,
  useDeleteLoanTransactionMutation,
} = loanTransactionApi;
