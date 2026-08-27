import fs from "fs/promises";
import Note from "../models/Note.js";
import ApiError from "../utils/ApiError.js";
import mongoose from "mongoose";

import {
  createModeration,
  resetModeration,
  deleteModeration,
} from "./noteModerationService.js";

export const createNote = async (noteData) => {
  const note = await Note.create(noteData);

  await createModeration(note._id);

  return note;
};

export const getAllNotes = async ({
  category,
  subject,
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
        isPublic: true,
        ...(category && {
          "category._id": new mongoose.Types.ObjectId(category),
        }),

        ...(subject && {
          subject: {
            $regex: subject,
            $options: "i",
          },
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
      $match: {
        "moderation.status": "approved",
      },
    },
    {
      $project: {
        moderation: 0,
        "category.description": 0,
        "category.image": 0,
        "category.isActive": 0,
        "category.createdAt": 0,
        "category.updatedAt": 0,
        "category.__v": 0,
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

export const getNotesByUser = async (userId) => {
  return await Note.aggregate([
    {
      $match: {
        uploadedBy: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "notemoderations",
        localField: "_id",
        foreignField: "noteId",
        as: "moderation",
      },
    },
    {
      $addFields: {
        moderationStatus: {
          $arrayElemAt: ["$moderation.status", 0],
        },
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
      $project: {
        moderation: 0,
        "category.description": 0,
        "category.image": 0,
        "category.isActive": 0,
        "category.createdAt": 0,
        "category.updatedAt": 0,
        "category.__v": 0,
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]);
};
export const getMyNoteById = async (noteId, userId) => {
  return await Note.findOne({
    _id: noteId,
    uploadedBy: userId,
  })
    .populate("category")
    .populate("uploadedBy", "name email");
};

export const getNoteById = async (noteId, userId = null) => {
  const notes = await Note.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(noteId),
      },
    },

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

    // Only approved notes can be viewed
    {
      $match: {
        "moderation.status": "approved",
      },
    },

    // Public notes OR private notes owned by current user
    {
      $match: userId
        ? {
            $or: [
              { isPublic: true },
              {
                isPublic: false,
                uploadedBy: new mongoose.Types.ObjectId(userId),
              },
            ],
          }
        : {
            isPublic: true,
          },
    },

    {
      $project: {
        moderation: 0,
        "category.description": 0,
        "category.image": 0,
        "category.isActive": 0,
        "category.createdAt": 0,
        "category.updatedAt": 0,
        "category.__v": 0,
        "uploadedBy.passwordHash": 0,
        "uploadedBy.__v": 0,
      },
    },
  ]);

  return notes[0] || null;
};

export const incrementDownloads = async (noteId) => {
  return await Note.findByIdAndUpdate(
    noteId,
    { $inc: { downloads: 1 } },
    { new: true },
  );
};

export const getNoteForDownload = async (noteId, userId = null) => {
  const notes = await Note.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(noteId),

        $or: [
          { isPublic: true },
          ...(userId
            ? [
                {
                  isPublic: false,
                  uploadedBy: new mongoose.Types.ObjectId(userId),
                },
              ]
            : []),
        ],
      },
    },
    {
      $lookup: {
        from: "notemoderations",
        localField: "_id",
        foreignField: "noteId",
        as: "moderation",
      },
    },
    {
      $match: {
        "moderation.status": "approved",
      },
    },
  ]);

  return notes[0] || null;
};

export const updateNote = async (noteId, userId, updateData) => {
  const oldNote = await Note.findOne({
    _id: noteId,
    uploadedBy: userId,
  });

  if (!oldNote) {
    return null;
  }

  const oldFile = oldNote.file;
  const oldThumbnail = oldNote.thumbnail;

  const updateFields = {
    title: updateData.title,
    description: updateData.description,
    subject: updateData.subject,
    category: updateData.category,
  };

  if (updateData.file) {
    updateFields.file = updateData.file;
  }

  if (updateData.thumbnail) {
    updateFields.thumbnail = updateData.thumbnail;
  }

  const updatedNote = await Note.findOneAndUpdate(
    {
      _id: noteId,
      uploadedBy: userId,
    },
    {
      $set: updateFields,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!updatedNote) {
    return null;
  }

  // Delete old PDF after successful update
  if (updateData.file && oldFile && oldFile !== updateData.file) {
    await deleteFile(oldFile);
  }

  // Delete old thumbnail after successful update
  if (
    updateData.thumbnail &&
    oldThumbnail &&
    oldThumbnail !== updateData.thumbnail
  ) {
    await deleteFile(oldThumbnail);
  }
  await resetModeration(noteId);

  return updatedNote;
};

export const deleteNote = async (noteId, userId) => {
  const note = await Note.findOne({
    _id: noteId,
    uploadedBy: userId,
  });

  if (!note) {
    return null;
  }

  await Note.findByIdAndDelete(noteId);
  await deleteModeration(noteId);

  // Delete PDF
  if (note.file) {
    await deleteFile(note.file);
  }

  // Delete thumbnail
  if (note.thumbnail) {
    await deleteFile(note.thumbnail);
  }

  return note;
};

const deleteFile = async (filePath) => {
  try {
    await fs.unlink(filePath);
  } catch (error) {
    // File may already be deleted
    if (error.code !== "ENOENT") {
      console.error(`Failed to delete file: ${filePath}`, error);
    }
  }
};

export const updateNoteVisibility = async ({ noteId, userId, isPublic }) => {
  const note = await Note.findById(noteId);

  if (!note) {
    throw new ApiError(404, "Note not found");
  }

  if (note.uploadedBy.toString() !== userId.toString()) {
    throw new ApiError(
      403,
      "You are not allowed to change this note's visibility",
    );
  }

  note.isPublic = isPublic;

  await note.save();

  return note;
};
