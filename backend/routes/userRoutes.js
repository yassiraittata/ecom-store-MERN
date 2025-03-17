import express from "express";
import { body } from "express-validator";

import {
  createUser,
  getAllUsers,
  getUserProfile,
  updateCurrentUser,
} from "../controllers/userController.js";
import { loginUser, logoutUser } from "../controllers/authController.js";
import { authenticate, isAdmin } from "../middlewares/authentication.js";

const router = express.Router();

router
  .route("/")
  .post(
    [
      body("username").isString(),
      body("email").isString().isEmail(),
      body("password").isString(),
    ],
    createUser
  );

router.route("/").get(authenticate, isAdmin, getAllUsers);
router.route("/profile").get(authenticate, getUserProfile);
router.route("/profile").put(authenticate, updateCurrentUser);

router
  .route("/auth/login")
  .post(
    [body("email").isString().isEmail(), body("password").isString()],
    loginUser
  );
router.route("/auth/logout").post(authenticate, logoutUser);

export default router;
