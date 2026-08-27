import { ArrowRight, Bookmark, Download, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSavedNotes } from "../../context/SavedNoteContext";

const NoteCard = ({ note }) => {
  const { savedNotes, saveNote, unsaveNote } = useSavedNotes();
  const [saving, setSaving] = useState(false);

  const isSaved = savedNotes.some(
    (savedNote) => (savedNote.noteId?._id || savedNote.noteId) === note._id,
  );

  const handleSaveToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setSaving(true);

      if (isSaved) {
        await unsaveNote(note._id);
      } else {
        await saveNote(note._id);
      }
    } catch (error) {
      console.error("Failed to update saved note:", error);
    } finally {
      setSaving(false);
    }
  };
  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-300/80 hover:shadow-xl hover:shadow-indigo-500/10">
      <div>
        {/* Thumbnail Container */}
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

          {/* Badges Overlay */}
          <div className="absolute left-3.5 top-3.5 flex flex-wrap gap-1.5">
            {note.category?.name && (
              <span className="rounded-full bg-slate-900/80 px-2.5 py-1 text-xs font-semibold text-white shadow-sm backdrop-blur-md">
                {note.category.name}
              </span>
            )}
            {note.subject && (
              <span className="rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-indigo-700 shadow-sm backdrop-blur-md">
                {note.subject}
              </span>
            )}
          </div>

          {/* Bookmark Button */}
          <button
            type="button"
            onClick={handleSaveToggle}
            disabled={saving}
            title={isSaved ? "Remove from saved notes" : "Save note"}
            className={`absolute right-3.5 top-3.5 flex h-9 w-9 items-center justify-center rounded-full shadow-sm backdrop-blur-md transition-all ${
              isSaved
                ? "bg-indigo-600 text-white shadow-indigo-500/30"
                : "bg-white/90 text-slate-500 hover:bg-white hover:text-indigo-600"
            } disabled:cursor-not-allowed disabled:opacity-60`}
          >
            <Bookmark size={17} fill={isSaved ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="line-clamp-2 min-h-[48px] text-base font-bold leading-snug text-slate-900 transition-colors group-hover:text-indigo-600">
            {note.title || "Untitled Note"}
          </h3>

          <p className="mt-2 line-clamp-2 min-h-[38px] text-xs leading-relaxed text-slate-500">
            {note.description || "No description provided for this study note."}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3.5 bg-slate-50/50">
        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
          <Download size={14} className="text-slate-400" />
          <span>
            {note.downloads ?? 0}{" "}
            {note.downloads === 1 ? "download" : "downloads"}
          </span>
        </div>

        <Link
          to={`/notes/${note._id}`}
          className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-1.5 text-xs font-bold text-indigo-600 border border-slate-200 shadow-sm transition-all duration-200 hover:border-indigo-300 hover:bg-indigo-600 hover:text-white hover:shadow-indigo-500/25"
        >
          <span>View</span>
          <ArrowRight size={13} />
        </Link>
      </div>
    </article>
  );
};

export default NoteCard;
