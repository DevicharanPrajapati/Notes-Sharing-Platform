import User from "../models/User.js";
import Note from "../models/Note.js";
import Category from "../models/Category.js";
import NoteModeration from "../models/NoteModeration.js";


export const getDashboardStats = async () => {
  const [
    totalUsers,
    totalNotes,
    totalCategories,
    pendingNotes,
    approvedNotes,
    rejectedNotes,
    downloads,
  ] = await Promise.all([
    User.countDocuments(),

    Note.countDocuments(),

    Category.countDocuments(),

    NoteModeration.countDocuments({
      status: "pending",
    }),

    NoteModeration.countDocuments({
      status: "approved",
    }),

    NoteModeration.countDocuments({
      status: "rejected",
    }),

    Note.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: "$downloads",
          },
        },
      },
    ]),
  ]);

  return {
    totalUsers,
    totalNotes,
    totalCategories,
    pendingNotes,
    approvedNotes,
    rejectedNotes,
    totalDownloads: downloads[0]?.total || 0,
  };
};



export const getAllAdminNotes = async () => {
  return await Note.aggregate([
    {
      $lookup: {
        from: "notemoderations",
        localField: "_id",
        foreignField: "noteId",
        as: "moderation",
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

        moderation: 1,
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]);
};