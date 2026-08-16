import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../services/categoryService.js";

export const createCategoryController = asyncHandler(async (req, res) => {
  const { name, slug, description, image } = req.body;

  if (!name || !slug) {
    throw new ApiError(400, "Name and slug are required");
  }

  const category = await createCategory({
    name,
    slug,
    description,
    image,
  });

  res.status(201).json({
    success: true,
    message: "Category created successfully",
    category,
  });
});

export const getCategoriesController = asyncHandler(async (req, res) => {
  const categories = await getAllCategories();

  res.status(200).json({
    success: true,
    categories,
  });
});

export const getCategoryController = asyncHandler(async (req, res) => {
  const category = await getCategoryById(req.params.id);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  res.status(200).json({
    success: true,
    category,
  });
});

export const updateCategoryController = asyncHandler(async (req, res) => {
  const { name, slug, description, image, isActive } = req.body;

  const category = await updateCategory(req.params.id, {
    name,
    slug,
    description,
    image,
    isActive,
  });

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  res.status(200).json({
    success: true,
    message: "Category updated successfully",
    category,
  });
});

export const deleteCategoryController = asyncHandler(async (req, res) => {
  const category = await deleteCategory(req.params.id);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  res.status(200).json({
    success: true,
    message: "Category deleted successfully",
  });
});
