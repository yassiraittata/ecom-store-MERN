import express from "express";
import { body } from "express-validator";

import {
  createUser,
  getAllUsers,
  getUserProfile,
  updateCurrentUser,
  deleteUser,
  getSingleUser,
} from "../controllers/userController.js";
import { loginUser, logoutUser } from "../controllers/authController.js";
import { authenticate, isAdmin } from "../middlewares/authentication.js";

const router = express.Router();

// Create a user
router
  .route("/create")
  .post(
    [
      body("username").isString(),
      body("email").isString().isEmail(),
      body("password").isString(),
    ],
    createUser
  );
// Get all users (Admin only)
router.route("/").get(authenticate, isAdmin, getAllUsers);

// Delete a user (Admin only)
router.route("/:id").delete(authenticate, isAdmin, deleteUser);

// get a single user (Admin only)
router.route("/:id").get(authenticate, isAdmin, getSingleUser);

// Get current user data
router.route("/profile").get(authenticate, getUserProfile);

// Update current user data
router.route("/profile").put(authenticate, updateCurrentUser);

// Auth Routes
router
  .route("/auth/login")
  .post(
    [body("email").isString().isEmail(), body("password").isString()],
    loginUser
  );
router.route("/auth/logout").post(authenticate, logoutUser);

export default router;
