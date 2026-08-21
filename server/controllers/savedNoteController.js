import {
  saveNoteService,
  unsaveNoteService,
  getSavedNotesService,
  checkSavedNoteService,
} from "../services/savedNoteService.js";

export const saveNote = async (req, res) => {
  try {
    const { noteId } = req.body;
    const userId = req.user.id;

    if (!noteId) {
      return res.status(400).json({
        success: false,
        message: "Note ID is required",
      });
    }

    const savedNote = await saveNoteService(userId, noteId);

    res.status(201).json({
      success: true,
      message: "Note saved successfully",
      savedNote,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const unsaveNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const userId = req.user.id;

    await unsaveNoteService(userId, noteId);

    res.status(200).json({
      success: true,
      message: "Note removed from saved notes",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSavedNotes = async (req, res) => {
  try {
    const userId = req.user.id;

    const savedNotes = await getSavedNotesService(userId);

    res.status(200).json({
      success: true,
      savedNotes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const checkSavedNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const userId = req.user.id;

    const savedNote = await checkSavedNoteService(userId, noteId);

    res.status(200).json({
      success: true,
      saved: !!savedNote,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};