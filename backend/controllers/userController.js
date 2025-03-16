import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";

import User from "../models/userModel.js";

export const createUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error("Please enter valid data!");
  }
  res.json({ message: "create user" });
});
