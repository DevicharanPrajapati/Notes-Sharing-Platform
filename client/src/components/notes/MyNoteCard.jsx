import { ArrowRight, Edit, FileText, Globe, Lock, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNotes } from "../../context/NoteContext";

const MyNoteCard = ({ note, onDelete, deleting }) => {
  const { updateNoteVisibility } = useNotes();

  const [isPublic, setIsPublic] = useState(note?.isPublic ?? true);
  const [updatingVisibility, setUpdatingVisibility] = useState(false);
  if (!note) return null;

  const handleVisibilityToggle = async () => {
    try {
      setUpdatingVisibility(true);

      const response = await updateNoteVisibility(note._id, !isPublic);

      setIsPublic(response.note.isPublic);
    } catch (error) {
      console.error("Failed to update note visibility:", error);
    } finally {
      setUpdatingVisibility(false);
    }
  };
  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-300/80 hover:shadow-xl hover:shadow-indigo-500/10">
      <div>
        {/* Thumbnail */}
        <div className="relative h-48 overflow-hidden bg-slate-100">
          {note.thumbnail ? (
            <img
              src={note.thumbnail}
              alt={note.title || "Note"}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-50/80 via-slate-50 to-purple-50/80">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-indigo-500 shadow-md shadow-indigo-100/50">
                <FileText size={28} />
              </div>
            </div>
          )}

          {/* Category */}
          {note.category?.name && (
            <span className="absolute left-3.5 top-3.5 rounded-full bg-slate-900/85 px-2.5 py-1 text-xs font-semibold text-white shadow-sm backdrop-blur-md">
              {note.category.name}
            </span>
          )}

          {/* Moderation Status Overlay */}
          {note.moderationStatus && (
            <span
              className={`absolute right-3.5 top-3.5 inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold shadow-sm backdrop-blur-md ${
                note.moderationStatus === "approved"
                  ? "bg-emerald-500 text-white"
                  : note.moderationStatus === "rejected"
                    ? "bg-rose-500 text-white"
                    : "bg-amber-500 text-white"
              }`}
            >
              {note.moderationStatus === "approved"
                ? "Approved"
                : note.moderationStatus === "rejected"
                  ? "Rejected"
                  : "Under Review"}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Subject */}
          {note.subject && (
            <span className="inline-flex rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-bold text-indigo-600">
              {note.subject}
            </span>
          )}

          {/* Title */}
          <h2 className="mt-2.5 line-clamp-2 min-h-[44px] text-base font-bold leading-snug text-slate-900 transition-colors group-hover:text-indigo-600">
            {note.title || "Untitled Note"}
          </h2>

          {/* Description */}
          <p className="mt-1.5 line-clamp-2 min-h-[36px] text-xs leading-relaxed text-slate-500">
            {note.description || "No description available."}
          </p>

          {/* Stats */}
          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-400">
            <span>
              {note.downloads ?? 0}{" "}
              {note.downloads === 1 ? "download" : "downloads"}
            </span>

            {note.createdAt && (
              <span>{new Date(note.createdAt).toLocaleDateString()}</span>
            )}
          </div>
        </div>
      </div>

      {/* Controls & Actions Footer */}
      <div className="border-t border-slate-100 bg-slate-50/50 p-4">
        {/* Visibility Toggle */}
        <div
          role="button"
          tabIndex={0}
          onClick={handleVisibilityToggle}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleVisibilityToggle();
            }
          }}
          className={`flex cursor-pointer items-center justify-between rounded-xl border p-2.5 transition-all ${
            isPublic
              ? "border-emerald-200 bg-emerald-50/70"
              : "border-slate-200 bg-white"
          } ${updatingVisibility ? "cursor-not-allowed opacity-60" : ""}`}
        >
          <div
            className={`flex items-center gap-1.5 text-xs font-bold ${
              isPublic ? "text-emerald-800" : "text-slate-600"
            }`}
          >
            {isPublic ? <Globe size={15} /> : <Lock size={15} />}
            <span>{isPublic ? "Public Access" : "Private (Draft)"}</span>
          </div>

          {/* Switch knob */}
          <div
            className={`relative h-5 w-9 rounded-full transition-colors ${
              isPublic ? "bg-emerald-600" : "bg-slate-300"
            }`}
          >
            <span
              className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-all ${
                isPublic ? "left-4.5" : "left-0.5"
              }`}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Link
            to={`/notes/${note._id}`}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-white px-3 py-2 text-xs font-bold text-indigo-600 border border-slate-200 shadow-sm transition hover:border-indigo-300 hover:bg-indigo-600 hover:text-white"
          >
            <span>View</span>
            <ArrowRight size={13} />
          </Link>

          <Link
            to={`/my-notes/edit/${note._id}`}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <Edit size={13} />
            <span>Edit</span>
          </Link>

          <button
            type="button"
            onClick={() => onDelete(note._id)}
            disabled={deleting}
            className="col-span-2 inline-flex items-center justify-center gap-1.5 rounded-xl border border-rose-200 bg-white px-3 py-2 text-xs font-semibold text-rose-600 shadow-sm transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {deleting ? (
              <>
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-rose-600 border-t-transparent" />
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 size={13} />
                <span>Delete Note</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

export default MyNoteCard;
