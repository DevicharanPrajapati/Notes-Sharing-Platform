import Note from "../models/Note.js";
import { createModeration } from "./noteModerationService.js";
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
