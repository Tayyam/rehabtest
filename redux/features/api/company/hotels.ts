import { apihotelsSlice } from "@/redux/app/api/apiSlice";

export const hotelsApiSlice = apihotelsSlice.injectEndpoints({
  endpoints: (builder) => ({
    // hotels
    getHotels: builder.query({
      query: ({ paginationPage }) => ({
        url: `/company/hotels?page=${paginationPage}`,
      }),
      providesTags: ["hotels"],
    }),
    // create a new hotels
    addHotels: builder.mutation({
      query: ({ data }) => ({
        url: `/company/hotels`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["hotels"],
    }),

    deleteHotels: builder.mutation({
      query: ({ id }) => ({
        url: `/company/hotels/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["hotels"],
    }),

    // select
    // hotel select
    getHotelsSelectCompany: builder.query({
      query: () => ({
        url: `/company/hotel/select`,
      }),
      providesTags: ["hotels"],
    }),
    // get hotels name use location id
    getHotelsNameByLocationId: builder.query({
      query: ({ id }) => ({
        url: `/company/hotel/select/${id}`,
      }),
    }),
    // get hotels locations
    getHotelsLocations: builder.query({
      query: () => ({
        url: `/company/locations/select`,
      }),
    }),
    // select contract type select
    getHotelsSelectType: builder.query({
      query: () => ({
        url: `/company/hotel/select/type`,
      }),
    }),
  }),
});

export const {
  useGetHotelsQuery,
  useAddHotelsMutation,
  useDeleteHotelsMutation,
  useGetHotelsSelectCompanyQuery,
  useGetHotelsLocationsQuery,
  useGetHotelsSelectTypeQuery,
  useGetHotelsNameByLocationIdQuery,
} = hotelsApiSlice;
