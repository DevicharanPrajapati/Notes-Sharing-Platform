import Category from "../models/Category.js";

export const createCategory = async (categoryData) => {
  return await Category.create(categoryData);
};

export const getAllCategories = async () => {
  return await Category.find().sort({ createdAt: -1 });
};

export const getCategoryById = async (categoryId) => {
  return await Category.findById(categoryId);
};

export const updateCategory = async (categoryId, updateData) => {
  return await Category.findByIdAndUpdate(
    categoryId,
    {
      $set: updateData,
    },
    {
      new: true,
      runValidators: true,
    },
  );
};

export const deleteCategory = async (categoryId) => {
  return await Category.findByIdAndDelete(categoryId);
};