import express from "express";
import { body } from "express-validator";

import {
  createUser,
  getUserProfile,
  updateCurrentUser,
} from "../controllers/userController.js";

import {
  getAllUsers,
  deleteUser,
  getSingleUser,
  updateSingleUser,
} from "../controllers/adminController.js";
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

//**  ADMIN ROUTES*/
// Get all users (Admin only)
router.route("/").get(authenticate, isAdmin, getAllUsers);

// Delete a user (Admin only)
router.route("/:id").delete(authenticate, isAdmin, deleteUser);

// get a single user (Admin only)
router.route("/:id").get(authenticate, isAdmin, getSingleUser);

// update a single user (Admin only)
router.route("/:id").put(authenticate, isAdmin, updateSingleUser);

//**  USER ROUTES*/
// Get current user data
router.route("/profile").get(authenticate, getUserProfile);

// Update current user data
router.route("/profile").put(authenticate, updateCurrentUser);

//**  AUTH ROUTES*/
router
  .route("/auth/login")
  .post(
    [body("email").isString().isEmail(), body("password").isString()],
    loginUser
  );
router.route("/auth/logout").post(authenticate, logoutUser);

export default router;
