import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

import User from "../models/userModel.js";

const authenticate = asyncHandler(async (req, res, next) => {
  // reqd jwt from the request
  let token = req.cookies.jwt;

  // verify token
  if (!token) {
    res.status(401);
    throw new Error("Unauthorized");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded) {
    res.status(401);
    throw new Error("Unauthorized");
  }

  req.user = await User.findById(decoded.userId).select("-password");
  next();
});

const isAdmin = (req, res, next) => {
  if (req.user?.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Unauthorized");
  }
};

export { authenticate, isAdmin };
