import asyncHandler from "express-async-handler";
import { isValidObjectId } from "mongoose";
import bcrypt from "bcryptjs";

import User from "../models/userModel.js";

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");

  res.json(users);
});

export const getSingleUser = asyncHandler(async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    res.status(404);
    throw new Error("User was not found");
  }
  const user = await User.findById(req.params.id).select("-password ");

  if (!user) {
    res.status(404);
    throw new Error("User was not found");
  }

  res.status(201).json(user);
});

export const deleteUser = asyncHandler(async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    res.status(404);
    throw new Error("User was not found");
  }
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User was not found");
  }

  if (user.isAdmin) {
    res.status(400);
    throw new Error("Cannot delete admin");
  }

  await User.deleteOne({ _id: user._id });

  res.status(201).json({
    message: "User deleted successfully",
    status: res.statusCode,
  });
});

export const updateSingleUser = asyncHandler(async (req, res) => {
  const body = req.body;

  if (!isValidObjectId(req.params.id)) {
    res.status(404);
    throw new Error("User was not found");
  }

  const user = await User.findById(req.params.id);

  console.log("Update user", user);
  if (!user) {
    res.status(404);
    throw new Error("User was not found");
  }

  user.username = body.username || user.username;
  user.email = body.email || user.email;
  user.isAdmin = Boolean(body.isAdmin) || Boolean(user.isAdmin);

  //   if (body.password) {
  //     const hashedPw = await bcrypt.hash(body.password, 12);
  //     user.password = hashedPw;
  //   }

  await user.save();

  res.status(201).json({
    message: "User updated successfully",
    status: res.statusCode,
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
      isAdmin: user.isAdmin,
    },
  });
});
