import express from "express";
import {
  getPendingNotesController,
  approveNoteController,
  rejectNoteController,
  setPendingNoteController,
} from "../controllers/noteModerationController.js";

import { getAllAdminNotesController } from "../controllers/adminNoteController.js";

const router = express.Router();

router.get("/", getAllAdminNotesController);

router.get("/pending", getPendingNotesController);
router.patch("/:id/approve", approveNoteController);

router.patch("/:id/reject", rejectNoteController);
router.patch("/:id/pending", setPendingNoteController);
export default router;
