import { apiSlice } from "../api/apiSlice";

const sectorsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSectors: builder.query({
      query: (email) => ({
        url: `/sectors/${email}`,
      }),
      providesTags: ["sectors"],
    }),
    getSector: builder.query({
      query: ({ email, sectorName }) => ({
        url: `/sector/${email}?sectorName=${sectorName}`,
      }),
    }),
    getParentSectors: builder.query({
      query: (email) => ({
        url: `/parent-sectors/${email}`,
      }),
      providesTags: ["sectors"],
    }),
    addSector: builder.mutation({
      query: (data) => ({
        url: "/sector",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["sectors"],
    }),
    updateSector: builder.mutation({
      query: ({ id, updatedInfo }) => ({
        url: `/sector/${id}`,
        method: "PUT",
        body: updatedInfo,
      }),
      invalidatesTags: ["sectors"],
    }),
    deleteSector: builder.mutation({
      query: (sectorId) => ({
        url: `/sector/${sectorId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["sectors"],
    }),
  }),
});

export const {
  useAddSectorMutation,
  useGetSectorsQuery,
  useGetParentSectorsQuery,
  useDeleteSectorMutation,
  useUpdateSectorMutation,
  useGetSectorQuery,
} = sectorsApi;
