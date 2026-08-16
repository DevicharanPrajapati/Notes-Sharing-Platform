import {
  ArrowRight,
  Edit,
  FileText,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";

const MyNoteCard = ({ note, onDelete, deleting }) => {
  if (!note) return null;

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg">
      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden bg-gray-100">
        {note.thumbnail ? (
          <img
            src={note.thumbnail}
            alt={note.title || "Note"}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white text-indigo-500 shadow-sm">
              <FileText size={28} />
            </div>
          </div>
        )}

        {/* Category */}
        {note.category?.name && (
          <span className="absolute left-4 top-4 rounded-full bg-indigo-600/95 px-3 py-1.5 text-xs font-semibold text-white shadow-sm backdrop-blur-sm">
            {note.category.name}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Subject */}
        {note.subject && (
          <span className="inline-flex rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600">
            {note.subject}
          </span>
        )}

        {/* Title */}
        <h2 className="mt-3 line-clamp-2 min-h-[48px] text-lg font-bold leading-6 text-gray-900">
          {note.title || "Untitled Note"}
        </h2>

        {/* Description */}
        <p className="mt-2 line-clamp-2 min-h-[40px] text-sm leading-5 text-gray-500">
          {note.description || "No description available."}
        </p>

        {/* Stats */}
        <div className="mt-4 flex items-center gap-4 border-t border-gray-100 pt-4 text-xs text-gray-500">
          <span>
            {note.downloads ?? 0}{" "}
            {note.downloads === 1 ? "download" : "downloads"}
          </span>

          {note.createdAt && (
            <span>
              {new Date(note.createdAt).toLocaleDateString()}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          {/* View */}
          <Link
            to={`/notes/${note._id}`}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-2.5 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-600 hover:text-white"
          >
            View
            <ArrowRight size={15} />
          </Link>

          {/* Edit */}
          <Link
            to={`/my-notes/edit/${note._id}`}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            <Edit size={15} />
            Edit
          </Link>

          {/* Delete */}
          <button
            type="button"
            onClick={() => onDelete(note._id)}
            disabled={deleting}
            className="col-span-2 inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-200 px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {deleting ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-600 border-t-transparent" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 size={15} />
                Delete Note
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

export default MyNoteCard;