import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

import {
  createCategory,
  updateCategory,
} from "../services/categoryService.js";

import {
  getAllAdminCategories,
  getAdminCategoryById,
  deleteAdminCategory,
} from "../services/adminCategoryService.js";

export const getAllAdminCategoriesController = asyncHandler(
  async (req, res) => {
    const categories = await getAllAdminCategories();

    res.status(200).json({
      success: true,
      categories,
    });
  },
);

export const getAdminCategoryByIdController = asyncHandler(
  async (req, res) => {
    const category = await getAdminCategoryById(req.params.id);

    if (!category) {
      throw new ApiError(404, "Category not found");
    }

    res.status(200).json({
      success: true,
      category,
    });
  },
);

export const createAdminCategoryController = asyncHandler(
  async (req, res) => {
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
  },
);

export const updateAdminCategoryController = asyncHandler(
  async (req, res) => {
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
  },
);

export const deleteAdminCategoryController = asyncHandler(
  async (req, res) => {
    const result = await deleteAdminCategory(req.params.id);

    if (!result) {
      throw new ApiError(404, "Category not found");
    }

    if (!result.deleted) {
      throw new ApiError(
        400,
        `Cannot delete category because it contains ${result.noteCount} note(s)`,
      );
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  },
);