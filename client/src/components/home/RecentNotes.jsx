import { useEffect } from "react";
import { ArrowRight, FileText, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import { useNotes } from "../../context/NoteContext";
import NoteCard from "../notes/NoteCard";

function RecentNotes() {
  const {
    notes,
    loading,
    error,
    fetchNotes,
  } = useNotes();

  useEffect(() => {
    fetchNotes({
      page: 1,
      limit: 3,
    });
  }, []);

  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-600">
              <Sparkles size={14} />
              <span>Fresh Resources</span>
            </div>

            <h2 className="mt-1.5 text-2xl font-bold text-slate-900 sm:text-3xl">
              Recently Added Notes
            </h2>
          </div>

          <Link
            to="/notes"
            className="hidden items-center gap-1 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700 sm:flex"
          >
            <span>Explore All</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-80 animate-pulse rounded-2xl border border-slate-200/80 bg-white"
              />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Empty */}
        {!loading &&
          !error &&
          (!notes || notes.length === 0) && (
            <div className="rounded-2xl border border-slate-200/80 bg-white p-12 text-center shadow-sm">
              <FileText
                size={36}
                className="mx-auto text-slate-400"
              />

              <p className="mt-3 text-sm text-slate-500">
                No notes uploaded yet. Be the first to share!
              </p>
            </div>
          )}

        {/* Notes Grid */}
        {!loading &&
          !error &&
          notes?.length > 0 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {notes.slice(0, 3).map((note) => (
                <NoteCard key={note._id} note={note} />
              ))}
            </div>
          )}

        {/* Mobile View All */}
        <div className="mt-5 sm:hidden">
          <Link
            to="/notes"
            className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            View All Notes
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default RecentNotes;