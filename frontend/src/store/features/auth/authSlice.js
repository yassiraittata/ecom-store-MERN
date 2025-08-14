import { createSlice } from "@reduxjs/toolkit";

// type User = {};

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      const expirationTime = new Date().getTime() + 15 * 24 * 60 * 60 * 1000; // set expiration date (15 days)
      localStorage.setItem("expirationTime", expirationTime);
    },

    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("expirationTime");
    },
  },
});

export default authSlice.reducer;
export const { setCredentials, logout } = authSlice.actions;
