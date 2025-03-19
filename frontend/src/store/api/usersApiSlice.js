import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  reducers: {
    createUser() {},
  },
});

export default userSlice.reducer;

export const { createUser } = userSlice.actions;
