import express from "express";
import { body } from "express-validator";

import { authenticate, isAdmin } from "../middlewares/authentication.js";
import {
  createCategoty,
  getAllCategories,
} from "../controllers/categoryController.js";

const router = express.Router();

router
  .route("/")
  .get(getAllCategories)
  .post(
    [body("name").isString().notEmpty()],
    authenticate,
    isAdmin,
    createCategoty
  );

export default router;
