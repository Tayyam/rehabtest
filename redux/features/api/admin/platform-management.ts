import { apiplatformManagementSlice } from "@/redux/app/api/apiSlice";

export const platformManagementApiSlice =
  apiplatformManagementSlice.injectEndpoints({
    endpoints: (builder) => ({
      // -----------------Countries------------------------
      getCountries: builder.query({
        query: () => ({
          url: `/admin/country`,
        }),
      }),

      // -----------------Locations------------------------
      getLocations: builder.query({
        query: ({ paginationPage }) => ({
          url: `/admin/location?page=${paginationPage}`,
        }),
        providesTags: ["platformManagement"],
      }),

      // -----------------Hotels------------------------
      getHotels: builder.query({
        query: ({ paginationPage }) => ({
          url: `/admin/hotels?page=${paginationPage}`,
        }),
        providesTags: ["platformManagement"],
      }),
      addHotel: builder.mutation({
        query: (data) => ({
          url: `/admin/hotels`,
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["platformManagement"],
      }),
      deleteHotel: builder.mutation({
        query: ({ id }) => ({
          url: `/admin/hotels/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["platformManagement"],
      }),

      // -----------------Camps------------------------
      getCamps: builder.query({
        query: ({ paginationPage }) => ({
          url: `/admin/camps?page=${paginationPage}`,
          params: { paginationPage },
        }),
        providesTags: ["platformManagement"],
      }),
      addCamp: builder.mutation({
        query: (data) => ({
          url: `/admin/camps`,
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["platformManagement"],
      }),
      deleteCamp: builder.mutation({
        query: ({ id }) => ({
          url: `/admin/camps/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["platformManagement"],
      }),

      // -----------------Price Routes------------------------
      getPriceRoutes: builder.query({
        query: ({ paginationPage }) => ({
          url: `/admin/price-route?paginationPage=${paginationPage}`,
        }),
        providesTags: ["platformManagement"],
      }),
      addPriceRoute: builder.mutation({
        query: (data) => ({
          url: `/admin/price-route`,
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["platformManagement"],
      }),

      deletePriceRoute: builder.mutation({
        query: ({ id }) => ({
          url: `/admin/price-route/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["platformManagement"],
      }),

      // -----------------Camp Routes------------------------
      getCampRoutes: builder.query({
        query: ({ paginationPage }) => ({
          url: `/admin/camp-routes?page=${paginationPage}`,
          // params: { page },
        }),
        providesTags: ["platformManagement"],
      }),
      addCampRoute: builder.mutation({
        query: (data) => ({
          url: `/admin/camp-routes`,
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["platformManagement"],
      }),
      deleteCampRoute: builder.mutation({
        query: ({ id }) => ({
          url: `/admin/camp-routes/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["platformManagement"],
      }),

      // -----------------Active------------------------
      // get all active
      getActive: builder.query({
        query: ({ paginationPage }) => ({
          url: `/admin/active?page=${paginationPage}`,
        }),
        providesTags: ["platformManagement"],
      }),
      // add active
      addActive: builder.mutation({
        query: ({ data }) => ({
          url: `/admin/active`,
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["platformManagement"],
      }),
      // delete active
      deleteActive: builder.mutation({
        query: ({ id }) => ({
          url: `/admin/active/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["platformManagement"],
      }),
      // update active
      updateActive: builder.mutation({
        query: ({ id, data }) => ({
          url: `/admin/active/${id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["platformManagement"],
      }),

      // -----------------selected------------------------

      // countries select
      getCountriesSelect: builder.query({
        query: () => ({
          url: `/admin/countrys/select`,
        }),
      }),
      // location select
      getLocationsSelect: builder.query({
        query: () => ({
          url: `/admin/locations/select`,
        }),
      }),
      // hotel select
      getHotelsSelect: builder.query({
        query: () => ({
          url: `/admin/hotels/select`,
        }),
      }),

      // hotel select location category
      getHotelsSelectCategory: builder.query({
        query: () => ({
          url: `/admin/hotel/select/category`,
        }),
      }),
      // camp select
      getCampsSelect: builder.query({
        query: () => ({
          url: `/admin/camp/select`,
        }),
      }),
      // camp-routes
      getCampRoutesSelect: builder.query({
        query: () => ({
          url: `/admin/camp-routes/select`,
        }),
      }),
      // outbound_arrival_location_id
      getOutboundArrivalLocationId: builder.query({
        query: () => ({
          url: `/admin/outbound-arrival-location-id`,
        }),
      }),

      // arrival_location
      getArrivalLocation: builder.query({
        query: () => ({
          url: `/admin/arrival/select`,
        }),
      }),
    }),
  });

export const {
  // ----country ----
  useGetCountriesQuery,
  // ----location ----
  useGetLocationsQuery,
  // ----hotels ----
  useGetHotelsQuery,
  useAddHotelMutation,
  useDeleteHotelMutation,
  // ----camps ----
  useGetCampsQuery,
  useAddCampMutation,
  useDeleteCampMutation,
  // ----price routes ----
  useGetPriceRoutesQuery,
  useAddPriceRouteMutation,
  useDeletePriceRouteMutation,
  // ----camp routes ----
  useGetCampRoutesQuery,
  useAddCampRouteMutation,
  useDeleteCampRouteMutation,
  // ----active ----
  useGetActiveQuery,
  useAddActiveMutation,
  useDeleteActiveMutation,
  useUpdateActiveMutation,

  // selected
  useGetCountriesSelectQuery,
  useGetLocationsSelectQuery,
  useGetHotelsSelectQuery,
  useGetHotelsSelectCategoryQuery,
  useGetCampsSelectQuery,
  useGetCampRoutesSelectQuery,
  useGetArrivalLocationQuery,
} = platformManagementApiSlice;
