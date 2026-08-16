import mongoose from "mongoose";
import Category from "../models/Category.js";
import Note from "../models/Note.js";

export const getAllAdminCategories = async () => {
  return await Category.aggregate([
    {
      $lookup: {
        from: "notes",
        localField: "_id",
        foreignField: "category",
        as: "notes",
      },
    },
    {
      $project: {
        name: 1,
        slug: 1,
        description: 1,
        image: 1,
        isActive: 1,
        createdAt: 1,
        updatedAt: 1,
        notesCount: {
          $size: "$notes",
        },
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]);
};

export const getAdminCategoryById = async (categoryId) => {
  const categories = await Category.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(categoryId),
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
      $project: {
        name: 1,
        slug: 1,
        description: 1,
        image: 1,
        isActive: 1,
        createdAt: 1,
        updatedAt: 1,
        notesCount: {
          $size: "$notes",
        },
      },
    },
  ]);

  return categories[0] || null;
};

export const deleteAdminCategory = async (categoryId) => {
  const noteCount = await Note.countDocuments({
    category: new mongoose.Types.ObjectId(categoryId),
  });

  if (noteCount > 0) {
    return {
      deleted: false,
      noteCount,
    };
  }

  const category = await Category.findByIdAndDelete(categoryId);

  if (!category) {
    return null;
  }

  return {
    deleted: true,
    category,
  };
};
