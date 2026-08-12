import path from "path";
import {
  createNote,
  getAllNotes,
  getNoteById,
  getNoteForDownload,
  incrementDownloads,
} from "../services/noteService.js";
import asyncHandler from "../utils/asyncHandler.js";
import { register } from "./authController.js";
import ApiError from "../utils/ApiError.js";

export const uploadNotes = asyncHandler(async (req, res) => {
  const { title, description, subject } = req.body;

  const note = await createNote({
    title,
    description,
    subject,
    file: req.file.path,
    uploadedBy: req.user._id,
  });

  res.status(201).json({
    success: true,
    message: "Note uploaded successfully",
    note,
  });
});

export const getNotes = asyncHandler(async (req, res) => {
  const notes = await getAllNotes();

  res.status(200).json({
    success: true,
    notes,
  });
});

export const getSingleNote = asyncHandler(async (req, res) => {
  const note = await getNoteById(req.params.id);

  if (!note) {
    throw new ApiError(404, "Note not found");
  }

  res.status(200).json({
    success: true,
    note,
  });
});


export const downloadNote = asyncHandler(async (req, res) => {
  const note = await getNoteForDownload(req.params.id);

  if (!note) {
    throw new ApiError(404, "Note not found");
  }

  const filePath = path.resolve(note.file);

  await incrementDownloads(note._id);

  res.download(filePath);
});