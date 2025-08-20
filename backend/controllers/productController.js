import asyncHandler from "express-async-handler";
import { matchedData, validationResult } from "express-validator";
import Product from "../models/productModel.js";

export const createProduct = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().map((err) => err.msg),
      details: errors.array(), // full details if you want
    });
  }

  const { name, price, category, description, quantity, brand, countInStock } =
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
    countInStock,
  });

  await product.save();

  res.status(201).json({
    message: "Product created successfully",
    status: res.statusCode,
    product,
  });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().map((err) => err.msg),
      details: errors.array(), // full details if you want
    });
  }

  const { name, price, category, description, quantity, brand, countInStock } =
    matchedData(req);
  const { id } = req.params;

  const existedProduct = await Product.findById(id);

  if (!existedProduct) {
    res.status(404);
    throw new Error("Product not found!");
  }

  existedProduct.name = name || existedProduct.name;
  existedProduct.price = price || existedProduct.price;
  existedProduct.category = category || existedProduct.category;
  existedProduct.description = description || existedProduct.description;
  existedProduct.quantity = quantity || existedProduct.quantity;
  existedProduct.brand = brand || existedProduct.brand;
  existedProduct.countInStock = countInStock || existedProduct.countInStock;
  await existedProduct.save();

  res.status(200).json({
    message: "Product updated successfully",
    status: res.statusCode,
    product: existedProduct,
  });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existedProduct = await Product.findById(id);

  if (!existedProduct) {
    res.status(404);
    throw new Error("Product not found!");
  }
  await existedProduct.deleteOne();

  res.status(200).json({
    message: "Product deleted successfully",
    status: res.statusCode,
  });
});

export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found!");
  }
  res.status(200).json({
    message: "Product retrieved successfully",
    status: res.statusCode,
    product,
  });
});

export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  const pageSize = 6;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (Number(req.query.page) || 0));

  res.status(200).json({
    status: res.statusCode,
    products,
    page: 1,
    pages: Math.ceil(count / pageSize),
    hasMore: false,
  });
});
