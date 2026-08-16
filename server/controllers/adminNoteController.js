import asyncHandler from "../utils/asyncHandler.js";
import {
  getAllAdminNotes,
} from "../services/adminNoteService.js";
import fileUrl from "../utils/fileUrl.js";
export const getAllAdminNotesController = asyncHandler(async (req, res) => {
  const {
    status,
    category,
    search,
    page = 1,
    limit = 10,
  } = req.query;

  const result = await getAllAdminNotes({
    status,
    category,
    search,
    page: Number(page),
    limit: Number(limit),
  });

  const notesResponse = result.notes.map((note) => ({
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
    pagination: result.pagination,
  });
});