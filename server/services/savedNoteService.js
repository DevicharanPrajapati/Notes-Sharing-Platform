import SavedNote from "../models/SavedNote.js";

export const saveNoteService = async (userId, noteId) => {
  const existingSavedNote = await SavedNote.findOne({
    userId,
    noteId,
  });

  if (existingSavedNote) {
    throw new Error("Note already saved");
  }

  return await SavedNote.create({
    userId,
    noteId,
  });
};

export const unsaveNoteService = async (userId, noteId) => {
  const deletedSavedNote = await SavedNote.findOneAndDelete({
    userId,
    noteId,
  });

  if (!deletedSavedNote) {
    throw new Error("Saved note not found");
  }

  return deletedSavedNote;
};

export const getSavedNotesService = async (userId) => {
  return await SavedNote.find({ userId })
    .populate("noteId")
    .sort({ createdAt: -1 });
};

export const checkSavedNoteService = async (userId, noteId) => {
  return await SavedNote.findOne({
    userId,
    noteId,
  });
};