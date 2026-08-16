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