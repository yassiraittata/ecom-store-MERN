import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";

const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth/login`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/auth/logout`,
        method: "POST",
      }),
    }),
    register: builder.mutation({
      query: (data) => ({ 
        url: `${USERS_URL}/create`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
  usersApiSlice;
