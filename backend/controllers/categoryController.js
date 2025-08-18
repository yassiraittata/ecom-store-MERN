import asyncHandler from "express-async-handler";
import { matchedData, validationResult } from "express-validator";

import Category from "../models/categoryModel.js";

export const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();

  res.json(categories);
});

export const createCategoty = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error("Please enter valid data!");
  }
  const { name } = matchedData(req);

  const existedCategory = await Category.findOne({ name });

  if (existedCategory) {
    res.status(400);
    throw new Error("Category already existed!");
  }

  const category = new Category({
    name,
  });

  await category.save();

  res.status(201).json({
    message: "Category created successfully",
    status: res.statusCode,
    category,
  });
});

export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await Category.findById(id);

  if (!category) {
    res.status(404);
    throw new Error("Category was not found!");
  }

  category.name = name;

  await category.save();

  res.status(201).json({
    message: "Category updated successfully",
    status: res.statusCode,
    category,
  });
});
