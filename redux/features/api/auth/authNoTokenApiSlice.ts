import { apiNoTokenAuthSlice } from "@/redux/app/api/apiSlice";

export const authNoTokenApiSlice = apiNoTokenAuthSlice.injectEndpoints({
  endpoints: (builder) => ({
    dashboardLogin: builder.mutation({
      // dashboard
      query: (loginValues) => ({
        url: "/login",
        method: "POST",
        body: loginValues,
      }),
    }),
  }),
});

export const { useDashboardLoginMutation } = authNoTokenApiSlice;
