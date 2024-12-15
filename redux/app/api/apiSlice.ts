import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
// import { logout } from "@/redux/features/local/auth/authSlice";
import { RootState } from "../store";
import { toast } from "sonner";
type MyError = {
  status: number;

  data?: {
    data?: string[];
  };
};
// Define the base URL from environment variables or a fallback URL
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export const baseQueryWithReAuth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: Record<string, unknown> = {} // Default to an empty object
) => {
  const fetchBase = fetchBaseQuery({
    baseUrl,
    credentials: "omit",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });

  try {
    const result = await fetchBase(args, api, extraOptions);

    if (result.error) {
      const error = result.error as MyError;
      const { status, data } = error;

      // Safely check if `data` and `data.data` exist
      if (status === 401) {
        // api.dispatch(logout());
      } else if (status === 422 && data && Array.isArray(data.data)) {
        // Ensure `data.data` is an array before accessing it
        (data.data as string[]).forEach((error: string) => toast.error(error));
      }
    }

    return result;
  } catch (error) {
    // Handle other errors
    throw error;
  }
};

export const apiAuthSlice = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({}),
  tagTypes: ["Auth"],
});

export const apiNoTokenAuthSlice = createApi({
  reducerPath: "authNoTokenApi",
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({}),
  tagTypes: ["AuthNoToken"],
});

export const apiProfileSlice = createApi({
  reducerPath: "profileApi",
  baseQuery: baseQueryWithReAuth,
  refetchOnFocus: true,
  endpoints: (builder) => ({}),
  tagTypes: ["Profile"],
});

export const apiplatformManagementSlice = createApi({
  reducerPath: "platformManagementApi",
  baseQuery: baseQueryWithReAuth,
  refetchOnFocus: true,
  endpoints: (builder) => ({}),
  tagTypes: ["platformManagement"],
});
export const apicompanySlice = createApi({
  reducerPath: "companyApi",
  baseQuery: baseQueryWithReAuth,
  refetchOnFocus: true,
  endpoints: (builder) => ({}),
  tagTypes: ["company"],
});
export const apihotelsSlice = createApi({
  reducerPath: "hotelsApi",
  baseQuery: baseQueryWithReAuth,
  refetchOnFocus: true,
  endpoints: (builder) => ({}),
  tagTypes: ["hotels"],
});
export const apicontractsSlice = createApi({
  reducerPath: "contractsApi",
  baseQuery: baseQueryWithReAuth,
  refetchOnFocus: true,
  endpoints: (builder) => ({}),
  tagTypes: ["contracts"],
});
export const apipackageSlice = createApi({
  reducerPath: "packageApi",
  baseQuery: baseQueryWithReAuth,
  refetchOnFocus: true,
  endpoints: (builder) => ({}),
  tagTypes: ["package"],
});
