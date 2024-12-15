import { configureStore } from "@reduxjs/toolkit";
import {
  apiAuthSlice,
  apiNoTokenAuthSlice,
  apiProfileSlice,
  apiplatformManagementSlice,
  apicompanySlice,
  apihotelsSlice,
  apicontractsSlice,
  apipackageSlice,
} from "./api/apiSlice";
import authReducer from "../features/local/auth/authSlice";
// import checkListReducer from "../features/local/example/checkListSlice";

const store = configureStore({
  reducer: {
    // api
    [apiAuthSlice.reducerPath]: apiAuthSlice.reducer,
    [apiNoTokenAuthSlice.reducerPath]: apiNoTokenAuthSlice.reducer,
    [apiProfileSlice.reducerPath]: apiProfileSlice.reducer,
    [apicompanySlice.reducerPath]: apicompanySlice.reducer,
    [apicontractsSlice.reducerPath]: apicontractsSlice.reducer,
    [apihotelsSlice.reducerPath]: apihotelsSlice.reducer,
    [apipackageSlice.reducerPath]: apipackageSlice.reducer,
    [apiplatformManagementSlice.reducerPath]:
      apiplatformManagementSlice.reducer,
    // local
    auth: authReducer,
    // checkList: checkListReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiAuthSlice.middleware,
      apiNoTokenAuthSlice.middleware,
      apicompanySlice.middleware,
      apiplatformManagementSlice.middleware,
      apihotelsSlice.middleware,
      apicontractsSlice.middleware,
      apipackageSlice.middleware,

      apiProfileSlice.middleware
    ),
  devTools: process.env.NODE_ENV === "development",
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
