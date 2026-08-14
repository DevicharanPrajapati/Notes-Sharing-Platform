import fs from "fs/promises";
import Note from "../models/Note.js";
import {
  createModeration,
  resetModeration,
  deleteModeration,
} from "./noteModerationService.js";

import mongoose from "mongoose";

export const createNote = async (noteData) => {
  const note = await Note.create(noteData);

  await createModeration(note._id);

  return note;
};

export const getAllNotes = async () => {
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
      $match: {
        "moderation.status": "approved",
      },
    },
    {
      $project: {
        moderation: 0,
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]);
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
      $project: {
        moderation: 0,
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]);
};

export const getNoteById = async (noteId) => {
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
      $match: {
        "moderation.status": "approved",
      },
    },
    {
      $project: {
        moderation: 0,
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

export const getNoteForDownload = async (noteId) => {
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
