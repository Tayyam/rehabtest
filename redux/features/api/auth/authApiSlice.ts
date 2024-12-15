import { apiAuthSlice } from "@/redux/app/api/apiSlice";

export const authApiSlice = apiAuthSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLogout: builder.mutation({
      query: (params) => ({
        url: `/logout`,
        method: "POST",
        params: { ...params },
      }),
    }),
    // get login user
    getLoginUser: builder.query({
      query: ({ companyName }) => ({
        url: `/${companyName}/auth`,
      }),
    }),
  }),
});

export const { useGetLogoutMutation, useGetLoginUserQuery } = authApiSlice;
