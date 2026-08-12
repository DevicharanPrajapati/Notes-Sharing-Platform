import express from "express";
import {
  getPendingNotesController,
  approveNoteController,
  rejectNoteController
} from "../controllers/noteModerationController.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/pending",
  authMiddleware,
  adminMiddleware,
  getPendingNotesController,
);
router.patch(
  "/:id/approve",
  authMiddleware,
  adminMiddleware,
  approveNoteController,
);


router.patch(
  "/:id/reject",
  authMiddleware,
  adminMiddleware,
  rejectNoteController
);
export default router;
