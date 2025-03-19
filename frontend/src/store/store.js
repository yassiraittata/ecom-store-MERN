import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./api/usersApiSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});
