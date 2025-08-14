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

//**  USER ROUTES */
// Get current user data
router
  .route("/profile")
  .get(authenticate, getUserProfile)
  .put(authenticate, updateCurrentUser);

//**  ADMIN ROUTES*/
// Get all users (Admin only)
router.route("/").get(authenticate, isAdmin, getAllUsers);

// Delete, Get, Update a user (Admin only)
router
  .route("/:id")
  .delete(authenticate, isAdmin, deleteUser)
  .get(authenticate, isAdmin, getSingleUser)
  .put(authenticate, isAdmin, updateSingleUser);

//**  AUTH ROUTES*/
router
  .route("/auth/login")
  .post(
    [body("email").isString().isEmail(), body("password").isString()],
    loginUser
  );

router.route("/auth/logout").post(authenticate, logoutUser);

export default router;
