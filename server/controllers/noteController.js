import path from "path";
import {
  createNote,
  getAllNotes,
  getNotesByUser,
  getNoteById,
  getNoteForDownload,
  incrementDownloads,
  updateNote,
  deleteNote,
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
    thumbnail: req.files.thumbnail
      ? req.files.thumbnail[0].path
      : null,
    uploadedBy: req.user._id,
  });

  const noteResponse = {
    ...note.toObject(),
    file: fileUrl(
      note.file,
      `${req.protocol}://${req.get("host")}`,
    ),
    thumbnail: fileUrl(
      note.thumbnail,
      `${req.protocol}://${req.get("host")}`,
    ),
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
    file: fileUrl(
      note.file,
      `${req.protocol}://${req.get("host")}`,
    ),
    thumbnail: fileUrl(
      note.thumbnail,
      `${req.protocol}://${req.get("host")}`,
    ),
  }));

  res.status(200).json({
    success: true,
    notes: notesResponse,
  });
});

export const getMyNotes = asyncHandler(async (req, res) => {
  const notes = await getNotesByUser(req.user._id);

  const notesResponse = notes.map((note) => ({
    ...note,
    file: fileUrl(
      note.file,
      `${req.protocol}://${req.get("host")}`,
    ),
    thumbnail: fileUrl(
      note.thumbnail,
      `${req.protocol}://${req.get("host")}`,
    ),
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
    file: fileUrl(
      note.file,
      `${req.protocol}://${req.get("host")}`,
    ),
    thumbnail: fileUrl(
      note.thumbnail,
      `${req.protocol}://${req.get("host")}`,
    ),
  };

  res.status(200).json({
    success: true,
    note: noteResponse,
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

export const updateNoteController = asyncHandler(async (req, res) => {
  const { title, description, subject } = req.body;

  const updateData = {
    title,
    description,
    subject,
  };

  if (req.files?.file?.[0]) {
    updateData.file = req.files.file[0].path;
  }

  if (req.files?.thumbnail?.[0]) {
    updateData.thumbnail = req.files.thumbnail[0].path;
  }

  const note = await updateNote(
    req.params.id,
    req.user._id,
    updateData,
  );

  if (!note) {
    throw new ApiError(
      404,
      "Note not found or you are not authorized",
    );
  }

  const noteResponse = {
    ...note.toObject(),
    file: fileUrl(
      note.file,
      `${req.protocol}://${req.get("host")}`,
    ),
    thumbnail: fileUrl(
      note.thumbnail,
      `${req.protocol}://${req.get("host")}`,
    ),
  };

  res.status(200).json({
    success: true,
    message: "Note updated successfully",
    note: noteResponse,
  });
});

export const deleteNoteController = asyncHandler(async (req, res) => {
  const note = await deleteNote(
    req.params.id,
    req.user._id,
  );

  if (!note) {
    throw new ApiError(
      404,
      "Note not found or you are not authorized",
    );
  }

  res.status(200).json({
    success: true,
    message: "Note deleted successfully",
  });
});

export const viewNote = asyncHandler(async (req, res) => {
  const note = await getNoteForDownload(req.params.id);

  if (!note) {
    throw new ApiError(404, "Note not found");
  }

  const filePath = path.resolve(note.file);

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "inline");

  res.sendFile(filePath);
});