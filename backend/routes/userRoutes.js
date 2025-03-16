import express from "express";
import { body } from "express-validator";

import { createUser } from "../controllers/userController.js";

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

export default router;
