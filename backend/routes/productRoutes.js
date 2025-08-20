import express from "express";
import formidable from "express-formidable";
import { body } from "express-validator";

import { authenticate, isAdmin } from "../middlewares/authentication.js";
import { checkId } from "../middlewares/checkId.js";

const router = express.Router();

import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
  fetchAllProducts,
  addProductReview,
} from "../controllers/productController.js";

router
  .route("/")
  .get(getAllProducts)
  .post(
    authenticate,
    isAdmin,
    formidable(),
    [
      body("name").notEmpty().withMessage("Name is required"),
      body("price").isNumeric().withMessage("Price must be a number"),
      body("brand").notEmpty().withMessage("Brand is required"),
      body("image").notEmpty().withMessage("Brand is required"),
      body("quantity").isNumeric().withMessage("Quantity must be a number"),
      body("category").notEmpty().withMessage("Category is required"),
      body("countInStock")
        .isNumeric()
        .withMessage("Count in stock must be a number"),
      body("description")
        .optional()
        .isString()
        .withMessage("Description must be a string"),
    ],
    createProduct
  );

router.route("/all").get(fetchAllProducts);

router
  .route("/:id")
  .put(
    authenticate,
    isAdmin,
    formidable(),
    [
      body("name").notEmpty().withMessage("Name is required"),
      body("price").isNumeric().withMessage("Price must be a number"),
      body("brand").notEmpty().withMessage("Brand is required"),
      body("image").notEmpty().withMessage("Brand is required"),
      body("quantity").isNumeric().withMessage("Quantity must be a number"),
      body("category").notEmpty().withMessage("Category is required"),
      body("countInStock")
        .isNumeric()
        .withMessage("Count in stock must be a number"),
      body("description")
        .optional()
        .isString()
        .withMessage("Description must be a string"),
    ],
    updateProduct
  )
  .delete(authenticate, isAdmin, checkId, deleteProduct);

router.route("/:id/reviews").post(authenticate, isAdmin, addProductReview);

export default router;
