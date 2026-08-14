import { ArrowRight, Download, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const NoteCard = ({ note }) => {
  if (!note) return null;

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl">
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
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-indigo-500 shadow-sm">
              <FileText size={32} />
            </div>
          </div>
        )}

        {note.subject && (
          <div className="absolute left-4 top-4">
            <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-indigo-600 shadow-sm backdrop-blur-sm">
              {note.subject}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="line-clamp-2 min-h-[48px] text-lg font-bold leading-6 text-gray-900 transition-colors group-hover:text-indigo-600">
          {note.title || "Untitled Note"}
        </h3>

        <p className="mt-2 line-clamp-2 min-h-[40px] text-sm leading-5 text-gray-500">
          {note.description || "No description available."}
        </p>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Download size={15} />

            <span>
              {note.downloads ?? 0}{" "}
              {note.downloads === 1 ? "download" : "downloads"}
            </span>
          </div>

          <Link
            to={`/notes/${note._id}`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600 transition-all duration-200 hover:bg-indigo-600 hover:text-white"
          >
            View Note
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default NoteCard;