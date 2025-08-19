import asyncHandler from "express-async-handler";
import { matchedData, validationResult } from "express-validator";
import Product from "../models/productModel.js";

export const createProduct = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error("Please enter valid data!");
  }

  const { name, price, category, description, quantity, brand } =
    matchedData(req);

  const existedProduct = await Product.findOne({ name });

  if (existedProduct) {
    res.status(400);
    throw new Error("Product already existed!");
  }

  const product = new Product({
    name,
    price,
    category,
    description,
    quantity,
    brand,
  });

  await product.save();

  res.status(201).json({
    message: "Product created successfully",
    status: res.statusCode,
    product,
  });
});
