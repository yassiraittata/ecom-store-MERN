import asyncHandler from "express-async-handler";
import { matchedData, validationResult } from "express-validator";
import bcrypt from "bcryptjs";

import User from "../models/userModel.js";

export const createUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error("Please enter valid data!");
  }
  const { email, username, password } = matchedData(req);

  const userExisted = await User.findOne({ email });

  if (userExisted) {
    res.status(400);
    throw new Error("Email already existed");
  }

  const hashedPw = await bcrypt.hash(password, 12);

  const user = new User({
    email,
    username,
    password: hashedPw,
  });

  await user.save();

  res.status(201).json({
    message: "User created successfully",
    status: res.statusCode,
    user: { id: user._id, email, username },
  });
});
