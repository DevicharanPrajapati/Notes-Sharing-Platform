import express from "express";

import {
  uploadNotes,
  getNotes,
  getMyNotes,
  getSingleNote,
  downloadNote,
  updateNoteController,
  deleteNoteController,
  viewNote,
} from "../controllers/noteController.js";

import upload from "../middleware/uploadMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  uploadNotes,
);

router.get("/", getNotes);

router.get(
  "/my-notes",
  authMiddleware,
  getMyNotes,
);

router.put(
  "/:id",
  authMiddleware,
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  updateNoteController,
);

router.delete(
  "/:id",
  authMiddleware,
  deleteNoteController,
);

router.get("/:id/view", authMiddleware, viewNote);

router.get(
  "/:id",
  authMiddleware,
  getSingleNote,
);

router.get(
  "/:id/download",
  authMiddleware,
  downloadNote,
);

export default router;