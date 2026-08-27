import mongoose from "mongoose";
import Note from "../models/Note.js";

export const getAllAdminNotes = async ({
  status,
  category,
  search,
  page = 1,
  limit = 10,
} = {}) => {
  const skip = (page - 1) * limit;

  const result = await Note.aggregate([
    {
      $lookup: {
        from: "notemoderations",
        localField: "_id",
        foreignField: "noteId",
        as: "moderation",
      },
    },

    {
      $unwind: {
        path: "$moderation",
        preserveNullAndEmptyArrays: true,
      },
    },

    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
      },
    },

    {
      $unwind: {
        path: "$category",
        preserveNullAndEmptyArrays: true,
      },
    },

    {
      $lookup: {
        from: "users",
        localField: "uploadedBy",
        foreignField: "_id",
        as: "uploadedBy",
      },
    },

    {
      $unwind: {
        path: "$uploadedBy",
        preserveNullAndEmptyArrays: true,
      },
    },

    {
      $match: {
        ...(status && {
          "moderation.status": status,
        }),

        ...(category && {
          "category._id": new mongoose.Types.ObjectId(category),
        }),

        ...(search && {
          $or: [
            {
              title: {
                $regex: search,
                $options: "i",
              },
            },
            {
              description: {
                $regex: search,
                $options: "i",
              },
            },
            {
              subject: {
                $regex: search,
                $options: "i",
              },
            },
          ],
        }),
      },
    },

    {
      $project: {
        title: 1,
        description: 1,
        subject: 1,
        file: 1,
        thumbnail: 1,
        isPaid: 1,
        price: 1,
        downloads: 1,
        createdAt: 1,
        updatedAt: 1,

        category: {
          _id: 1,
          name: 1,
          slug: 1,
        },

        uploadedBy: {
          _id: 1,
          name: 1,
          email: 1,
        },

        moderation: {
          _id: 1,
          status: 1,
          rejectionReason: 1,
          reviewedAt: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    },

    {
      $sort: {
        createdAt: -1,
      },
    },

    {
      $facet: {
        notes: [
          {
            $skip: skip,
          },
          {
            $limit: limit,
          },
        ],

        total: [
          {
            $count: "count",
          },
        ],
      },
    },
  ]);

  const totalNotes = result[0]?.total[0]?.count || 0;

  return {
    notes: result[0]?.notes || [],

    pagination: {
      page,
      limit,
      totalNotes,
      totalPages: Math.ceil(totalNotes / limit),
    },
  };
};

