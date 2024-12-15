import { apicontractsSlice } from "@/redux/app/api/apiSlice";

export const contractsApiSlice = apicontractsSlice.injectEndpoints({
  endpoints: (builder) => ({
    // contracts
    getContracts: builder.query({
      query: ({ paginationPage }) => ({
        url: `/company/contract-orgs?page=${paginationPage}`,
      }),
      providesTags: ["contracts"],
    }),
    // create a new contracts
    addContracts: builder.mutation({
      query: ({ data }) => ({
        url: `/company/contract-orgs`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["contracts"],
    }),

    deleteContracts: builder.mutation({
      query: ({ id }) => ({
        url: `/company/contract-orgs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["contracts"],
    }),
  }),
});

export const {
  useGetContractsQuery,
  useAddContractsMutation,
  useDeleteContractsMutation,
} = contractsApiSlice;
