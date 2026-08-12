import express from "express";
import {
  uploadNotes,
  getNotes,
  getSingleNote,
  downloadNote,
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

router.get("/:id", authMiddleware, getSingleNote);
router.get("/:id/download", authMiddleware, downloadNote);

export default router;
