import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

export const createUser = asyncHandler(async (req, res) => {
  res.json({ message: "create user" });
});
