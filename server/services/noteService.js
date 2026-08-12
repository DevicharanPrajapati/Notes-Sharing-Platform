import Note from "../models/Note.js";

export const createNote = async (noteData) => {
  const note = await Note.create(noteData);

  return note;
};

export const getAllNotes = async () => {
  return await Note.find()
    .populate("uploadedBy", "name email")
    .sort({ createdAt: -1 });
};

export const getNoteById = async (noteId) => {
  return await Note.findById(noteId)
    .populate("uploadedBy", "name email");
};

export const incrementDownloads = async (noteId) => {
  return await Note.findByIdAndUpdate(
    noteId,
    { $inc: { downloads: 1 } },
    { new: true }
  );
};

export const getNoteForDownload = async (noteId) => {
  return await Note.findById(noteId);
};