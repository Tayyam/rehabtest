import { apicompanySlice } from "@/redux/app/api/apiSlice";

export const companyApiSlice = apicompanySlice.injectEndpoints({
  endpoints: (builder) => ({
    // company
    getcompanies: builder.query({
      query: ({ paginationPage }) => ({
        url: `/admin/company?page=${paginationPage}`,
        // params: { page },
      }),
      providesTags: ["company"],
    }),
    // create a new company
    addCompany: builder.mutation({
      query: (data) => ({
        url: `/admin/create-user`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["company"],
    }),

    deleteCompany: builder.mutation({
      query: ({ id }) => ({
        url: `/admin/company/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["company"],
    }),
  }),
});

export const {
  useGetcompaniesQuery,
  useAddCompanyMutation,
  useDeleteCompanyMutation,
} = companyApiSlice;
