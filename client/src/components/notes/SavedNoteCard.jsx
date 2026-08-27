import { ArrowRight, Bookmark, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const SavedNoteCard = ({ note, onUnsave, removing }) => {
  if (!note) return null;

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

          {/* Saved Badge */}
          <span className="absolute right-3.5 top-3.5 flex items-center gap-1.5 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white shadow-sm shadow-indigo-500/30 backdrop-blur-md">
            <Bookmark size={13} fill="currentColor" />
            <span>Saved</span>
          </span>

          {note.category?.name && (
            <span className="absolute left-3.5 top-3.5 rounded-full bg-slate-900/80 px-2.5 py-1 text-xs font-semibold text-white shadow-sm backdrop-blur-md">
              {note.category.name}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {note.subject && (
            <span className="inline-flex rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-bold text-indigo-600">
              {note.subject}
            </span>
          )}

          <h2 className="mt-2.5 line-clamp-2 min-h-[44px] text-base font-bold leading-snug text-slate-900 transition-colors group-hover:text-indigo-600">
            {note.title || "Untitled Note"}
          </h2>

          <p className="mt-1.5 line-clamp-2 min-h-[36px] text-xs leading-relaxed text-slate-500">
            {note.description || "No description available."}
          </p>
        </div>
      </div>

      {/* Footer & Actions */}
      <div className="border-t border-slate-100 bg-slate-50/50 p-4">
        <div className="grid grid-cols-2 gap-2">
          <Link
            to={`/notes/${note._id}`}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-white px-3 py-2 text-xs font-bold text-indigo-600 border border-slate-200 shadow-sm transition hover:border-indigo-300 hover:bg-indigo-600 hover:text-white"
          >
            <span>View</span>
            <ArrowRight size={13} />
          </Link>

          <button
            type="button"
            onClick={() => onUnsave(note._id)}
            disabled={removing}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-rose-600 shadow-sm transition hover:border-rose-200 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {removing ? (
              <>
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-rose-600 border-t-transparent" />
                <span>Removing...</span>
              </>
            ) : (
              <>
                <Bookmark size={13} />
                <span>Unsave</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

export default SavedNoteCard;
