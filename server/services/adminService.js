import User from "../models/User.js";
import Note from "../models/Note.js";
import Category from "../models/Category.js";
import NoteModeration from "../models/NoteModeration.js";

export const getDashboardStats = async () => {
  const [
    totalUsers,
    totalNotes,
    totalCategories,
    pendingNotesCount,
    approvedNotes,
    rejectedNotes,
    downloads,
    recentUsers,
    recentNotes,
    pendingNotes,
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

    User.find().select("-passwordHash").sort({ createdAt: -1 }).limit(5),

    Note.find()
      .populate("uploadedBy", "name email")
      .populate("category", "name slug")
      .sort({ createdAt: -1 })
      .limit(5),

    NoteModeration.find({ status: "pending" })
      .populate({
        path: "noteId",
        populate: [
          {
            path: "uploadedBy",
            select: "name email",
          },
          {
            path: "category",
            select: "name slug",
          },
        ],
      })
      .sort({ createdAt: -1 })
      .limit(5),
  ]);

  return {
    stats: {
      totalUsers,
      totalNotes,
      totalCategories,
      pendingNotes: pendingNotesCount,
      approvedNotes,
      rejectedNotes,
      totalDownloads: downloads[0]?.total || 0,
    },

    recentUsers,

    recentNotes,

    pendingNotes,
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
