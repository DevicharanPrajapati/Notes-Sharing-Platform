import express from "express";

import {
  saveNote,
  unsaveNote,
  getSavedNotes,
  checkSavedNote,
} from "../controllers/savedNoteController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, saveNote);

router.delete("/:noteId", authMiddleware, unsaveNote);

router.get("/", authMiddleware, getSavedNotes);

router.get("/check/:noteId", authMiddleware, checkSavedNote);

export default router;