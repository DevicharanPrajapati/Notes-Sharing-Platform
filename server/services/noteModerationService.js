import NoteModeration from "../models/NoteModeration.js";

export const createModeration = async (noteId) => {
  return await NoteModeration.create({
    noteId,
    status: "pending",
  });
};

export const getPendingNotes = async () => {
  return await NoteModeration.find({ status: "pending" })
    .populate({
      path: "noteId",
      populate: {
        path: "uploadedBy",
        select: "name email",
      },
    })
    .sort({ createdAt: -1 });
};


export const approveNote = async (moderationId, adminId) => {
  return await NoteModeration.findByIdAndUpdate(
    moderationId,
    {
      status: "approved",
      adminId,
      reviewedAt: new Date(),
    },
    { new: true }
  );
};


export const rejectNote = async (moderationId, adminId, rejectionReason) => {
  return await NoteModeration.findByIdAndUpdate(
    moderationId,
    {
      status: "rejected",
      adminId,
      rejectionReason,
      reviewedAt: new Date(),
    },
    { new: true }
  );
};



export const resetModeration = async (noteId) => {
  return await NoteModeration.findOneAndUpdate(
    { noteId },
    {
      status: "pending",
      adminId: null,
      rejectionReason: null,
      reviewedAt: null,
    },
    { new: true },
  );
};


export const deleteModeration = async (noteId) => {
  return await NoteModeration.findOneAndDelete({
    noteId,
  });
};