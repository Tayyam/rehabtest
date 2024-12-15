"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCookie, setCookie, deleteCookie } from "cookies-next";

import { AuthPayload, AuthState } from "@/redux/types/auth/AuthTypes";

const initialState: AuthState = {
  email: getCookie("email") || "",
  token: decodeURIComponent(getCookie("token") || "") || null,
  name: getCookie("name") || null,
  type: getCookie("type") || null,
  image: getCookie("image") || null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthPayload>) => {
      const { email, token, name, type, image } = action.payload;
      state.email = email;
      state.name = name;
      state.token = token;
      email && setCookie("email", email);
      token && setCookie("token", token);
      name && setCookie("name", name);
      type && setCookie("type", type);
      image && setCookie("image", image);
    },

    setLogout: (state) => {
      state.email = null;
      state.user = null;
      state.token = null;
      deleteCookie("email");
      deleteCookie("token");
      deleteCookie("image");
      deleteCookie("name");
      deleteCookie("type");

      //cookies for protect paths
      window.location.href = "/";
    },
  },
});

const authReducer = authSlice.reducer;

export const { setCredentials, setLogout } = authSlice.actions;

export default authReducer;
