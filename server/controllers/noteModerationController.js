import asyncHandler from "../utils/asyncHandler.js";
import {
  getPendingNotes,
  approveNote,
  rejectNote,
  resetModeration,
} from "../services/noteModerationService.js";

import ApiError from "../utils/ApiError.js";

export const getPendingNotesController = asyncHandler(async (req, res) => {
  const notes = await getPendingNotes();

  res.status(200).json({
    success: true,
    notes,
  });
});

export const approveNoteController = asyncHandler(async (req, res) => {
  const moderation = await approveNote(req.params.id, req.user._id);

  if (!moderation) {
    throw new ApiError(404, "Moderation record not found");
  }

  res.status(200).json({
    success: true,
    message: "Note approved successfully",
    moderation,
  });
});

export const rejectNoteController = asyncHandler(async (req, res) => {
  const { rejectionReason } = req.body;

  if (!rejectionReason) {
    throw new ApiError(400, "Rejection reason is required");
  }

  const moderation = await rejectNote(
    req.params.id,
    req.user._id,
    rejectionReason,
  );

  if (!moderation) {
    throw new ApiError(404, "Moderation record not found");
  }

  res.status(200).json({
    success: true,
    message: "Note rejected successfully",
    moderation,
  });
});


export const setPendingNoteController = asyncHandler(async (req, res) => {
  const moderation = await resetModeration(req.params.id);

  if (!moderation) {
    throw new ApiError(404, "Moderation record not found");
  }

  res.status(200).json({
    success: true,
    message: "Note moved to pending successfully",
    moderation,
  });
});