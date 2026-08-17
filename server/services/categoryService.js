import Category from "../models/Category.js";

export const createCategory = async (categoryData) => {
  return await Category.create(categoryData);
};

export const getAllCategories = async () => {
  return await Category.aggregate([
    {
      $match: {
        isActive: true,
      },
    },
    {
      $lookup: {
        from: "notes",
        localField: "_id",
        foreignField: "category",
        as: "notes",
      },
    },
    {
      $lookup: {
        from: "notemoderations",
        localField: "notes._id",
        foreignField: "noteId",
        as: "moderations",
      },
    },
    {
      $addFields: {
        notesCount: {
          $size: {
            $filter: {
              input: "$moderations",
              as: "moderation",
              cond: {
                $eq: ["$$moderation.status", "approved"],
              },
            },
          },
        },
      },
    },
    {
      $project: {
        notes: 0,
        moderations: 0,
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]);
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