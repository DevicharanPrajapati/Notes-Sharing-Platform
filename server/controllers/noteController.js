import path from "path";
import {
  createNote,
  getAllNotes,
  getNoteById,
  getNoteForDownload,
  incrementDownloads,
} from "../services/noteService.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import fileUrl from "../utils/fileUrl.js";

export const uploadNotes = asyncHandler(async (req, res) => {
  const { title, description, subject } = req.body;

  const note = await createNote({
    title,
    description,
    subject,
    file: req.files.file[0].path,
    thumbnail: req.files.thumbnail ? req.files.thumbnail[0].path : null,
    uploadedBy: req.user._id,
  });

  const noteResponse = {
    ...note.toObject(),
    file: fileUrl(note.file, `${req.protocol}://${req.get("host")}`),
    thumbnail: fileUrl(note.thumbnail, `${req.protocol}://${req.get("host")}`),
  };

  res.status(201).json({
    success: true,
    message: "Note uploaded successfully",
    note: noteResponse,
  });
});

export const getNotes = asyncHandler(async (req, res) => {
  const notes = await getAllNotes();

  const notesResponse = notes.map((note) => ({
    ...note,
    file: fileUrl(note.file, `${req.protocol}://${req.get("host")}`),
    thumbnail: fileUrl(note.thumbnail, `${req.protocol}://${req.get("host")}`),
  }));

  res.status(200).json({
    success: true,
    notes: notesResponse,
  });
});

export const getSingleNote = asyncHandler(async (req, res) => {
  const note = await getNoteById(req.params.id);

  if (!note) {
    throw new ApiError(404, "Note not found");
  }
  const noteResponse = {
    ...note,
    file: fileUrl(note.file, `${req.protocol}://${req.get("host")}`),
    thumbnail: fileUrl(note.thumbnail, `${req.protocol}://${req.get("host")}`),
  };

  res.status(200).json({
    success: true,
    note : noteResponse,
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
