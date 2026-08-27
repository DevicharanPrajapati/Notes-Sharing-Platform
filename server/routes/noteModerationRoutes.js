import express from "express";
import {
  getPendingNotesController,
  approveNoteController,
  rejectNoteController,
  setPendingNoteController,
} from "../controllers/noteModerationController.js";

import roleMiddleware from "../middleware/roleMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { getAllAdminNotesController } from "../controllers/adminNoteController.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin", "staff"),
  getAllAdminNotesController,
);

router.get(
  "/pending",
  authMiddleware,
  roleMiddleware("admin", "staff"),
  getPendingNotesController,
);
router.patch(
  "/:id/approve",
  authMiddleware,
  roleMiddleware("admin", "staff"),
  approveNoteController,
);

router.patch(
  "/:id/reject",
  authMiddleware,
  roleMiddleware("admin", "staff"),
  rejectNoteController,
);
router.patch(
  "/:id/pending",
  authMiddleware,
  roleMiddleware("admin", "staff"),
  setPendingNoteController,
);

export default router;
