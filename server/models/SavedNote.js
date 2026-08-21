import mongoose from "mongoose";

const savedNoteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    noteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent the same user from saving the same note multiple times
savedNoteSchema.index(
  { userId: 1, noteId: 1 },
  { unique: true }
);

const SavedNote = mongoose.model("SavedNote", savedNoteSchema);

export default SavedNote;