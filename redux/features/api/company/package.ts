import { apipackageSlice } from "@/redux/app/api/apiSlice";

export const packageApiSlice = apipackageSlice.injectEndpoints({
  endpoints: (builder) => ({
    //  ------------------------ package----------------------------------------
    getPackage: builder.query({
      query: ({ paginationPage }) => ({
        url: `/company/packages?page=${paginationPage}`,
      }),
      providesTags: ["package"],
    }),
    addPackage: builder.mutation({
      query: ({ data }) => ({
        url: `/company/packages`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["package"],
    }),
    deletePackage: builder.mutation({
      query: ({ id }) => ({
        url: `/company/packages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["package"],
    }),

    //  --------- select ------------
    // get area
    getArea: builder.query({
      query: () => ({
        url: `/company/area`,
      }),
    }),

    // get hotel use area id
    getHotelByAreaId: builder.query({
      query: ({ id }) => ({
        url: `/company/hotel/select/${id}`,
      }),
    }),

    // get contract by hotel id
    getContractByHotelId: builder.query({
      query: ({ id }) => ({
        url: `/company/contract-orgs/select/${id}`,
      }),
    }),

    // het pachage type
    getPackageType: builder.query({
      query: () => ({
        url: `/company/package/type`,
      }),
    }),

    //get countrys
    getCountries: builder.query({
      query: () => ({
        url: `/company/countrys/select`,
      }),
    }),

    // get camp
    getCamps: builder.query({
      query: () => ({
        url: `/company/camp/select`,
      }),
    }),
  }),
});

export const {
  //----------- package -----------
  useGetPackageQuery,
  useAddPackageMutation,
  useDeletePackageMutation,

  //----------- select -----------
  useGetAreaQuery,
  useGetHotelByAreaIdQuery,
  useGetContractByHotelIdQuery,
  useGetPackageTypeQuery,
  useGetCountriesQuery,
  useGetCampsQuery,
} = packageApiSlice;
