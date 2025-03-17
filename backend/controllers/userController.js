import asyncHandler from "express-async-handler";
import { matchedData, validationResult } from "express-validator";
import bcrypt from "bcryptjs";

import User from "../models/userModel.js";
import generateToken from "../utils/createToken.js";

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

  generateToken(res, user._id);

  res.status(201).json({
    message: "User created successfully",
    status: res.statusCode,
    user: { id: user._id, email, username },
  });
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");

  res.json(users);
});

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User was not found");
  }
  res.json({
    id: user._id,
    email: user.email,
    username: user.username,
  });
});

export const updateCurrentUser = asyncHandler(async (req, res) => {
  const body = req.body;

  console.log("Update");

  const userExisted = await User.findById(req.user._id);

  if (!userExisted) {
    res.status(404);
    throw new Error("User was not found");
  }

  userExisted.username = body.username || userExisted.username;
  userExisted.email = body.email || userExisted.email;
  userExisted.isAdmin = body.isAdmin || userExisted.isAdmin;

  if (body.password) {
    const hashedPw = await bcrypt.hash(body.password, 12);
    userExisted.password = hashedPw || userExisted.password;
  }

  await userExisted.save();

  res.status(201).json({
    message: "User updated successfully",
    status: res.statusCode,
    user: {
      id: userExisted._id,
      email: userExisted.email,
      username: userExisted.username,
    },
  });
});
