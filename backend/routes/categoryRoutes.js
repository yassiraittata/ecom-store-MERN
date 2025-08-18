import express from "express";
import { body } from "express-validator";

import { authenticate, isAdmin } from "../middlewares/authentication.js";
import {
  createCategoty,
  deleteCategory,
  getAllCategories,
  updateCategory,
  getSingleCategory,
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

router
  .route("/:id")
  .put(authenticate, isAdmin, updateCategory)
  .delete(authenticate, isAdmin, deleteCategory)
  .get(getSingleCategory);

export default router;
