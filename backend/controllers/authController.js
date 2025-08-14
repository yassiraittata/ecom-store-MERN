import asyncHandler from "express-async-handler";
import { matchedData, validationResult } from "express-validator";
import bcrypt from "bcryptjs";

import User from "../models/userModel.js";
import generateToken from "../utils/createToken.js";

// LOGIN
export const loginUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error("Please enter valid data!");
  }
  const { email, password } = matchedData(req);

  const userExisted = await User.findOne({ email });

  if (!userExisted) {
    res.status(404);
    throw new Error("Email is not existed");
  }

  const isPwMatch = await bcrypt.compare(password, userExisted.password);

  if (!isPwMatch) {
    res.status(400);
    throw new Error("Invalid password!");
  }

  generateToken(res, userExisted._id);

  res.status(201).json({
    message: "User login successfully",
    status: res.statusCode,
    user: {
      id: userExisted._id,
      email: userExisted.email,
      username: userExisted.username,
      isAdmin: userExisted.isAdmin,
    },
  });
});

// LOGOUT
export const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "Strict" });
  res.status(200).json({ message: "Logged out successfully" });
});
