const { apiSlice } = require("../api/apiSlice");

const accountsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addAccount: builder.mutation({
      query: (data) => ({
        url: "/account",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddAccountMutation } = accountsApi;
