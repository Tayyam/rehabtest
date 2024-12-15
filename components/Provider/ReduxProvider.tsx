"use client";

import store from "@/redux/app/store";
import { Provider } from "react-redux";
import SuspenseProvider from "./SuspenseProvider";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <SuspenseProvider>{children}</SuspenseProvider>
    </Provider>
  );
}
