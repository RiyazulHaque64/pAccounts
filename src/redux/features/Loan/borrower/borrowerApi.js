import { apiSlice } from "../../api/apiSlice";

const borrowerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBorrowers: builder.query({
      query: (user) => ({
        url: `/borrowers/${user}`,
      }),
      providesTags: ["borrowers"],
    }),
    addBorrower: builder.mutation({
      query: (data) => ({
        url: "/borrower",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["borrowers"],
    }),
    updateBorrower: builder.mutation({
      query: ({ id, data }) => ({
        url: `/borrower/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["borrowers"],
    }),
    deleteBorrower: builder.mutation({
      query: (id) => ({
        url: `/borrower/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["borrowers"],
    }),
  }),
});

export const {
  useGetBorrowersQuery,
  useAddBorrowerMutation,
  useUpdateBorrowerMutation,
  useDeleteBorrowerMutation,
} = borrowerApi;
