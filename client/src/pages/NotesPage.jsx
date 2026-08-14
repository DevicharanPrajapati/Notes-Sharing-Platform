import { useEffect, useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";

import { useNotes } from "../context/NoteContext";

import NotesHeader from "../components/notes/NotesHeader";
import NotesSearch from "../components/notes/NotesSearch";
import NotesFilter from "../components/notes/NotesFilter";
import NotesGrid from "../components/notes/NotesGrid";
import NotesEmpty from "../components/notes/NotesEmpty";
import NotesSkeleton from "../components/notes/NotesSkeleton";

const NotesPage = () => {
  const { notes, loading, error, fetchNotes } = useNotes();

  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  // Get unique subjects
  const subjects = useMemo(() => {
    return [...new Set(notes.map((note) => note.subject).filter(Boolean))];
  }, [notes]);

  // Search + filter notes
  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        note.title?.toLowerCase().includes(searchText) ||
        note.description?.toLowerCase().includes(searchText) ||
        note.subject?.toLowerCase().includes(searchText);

      const matchesSubject =
        !subject || note.subject?.toLowerCase() === subject.toLowerCase();

      return matchesSearch && matchesSubject;
    });
  }, [notes, search, subject]);

  const handleReset = () => {
    setSearch("");
    setSubject("");
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {/* Header */}
        <NotesHeader totalNotes={notes.length} />

        {/* Search + Filter */}
        <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex-1">
              <NotesSearch search={search} setSearch={setSearch} />
            </div>

            <NotesFilter
              subject={subject}
              setSubject={setSubject}
              subjects={subjects}
            />
          </div>

          {/* Results info */}
          {!loading && (
            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
              <p className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-semibold text-gray-900">
                  {filteredNotes.length}
                </span>{" "}
                {filteredNotes.length === 1 ? "note" : "notes"}
              </p>

              {(search || subject) && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700"
                >
                  <RotateCcw size={15} />
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="mb-8 rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-600">{error}</p>

            <button
              type="button"
              onClick={fetchNotes}
              className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Loading */}
        {loading && <NotesSkeleton count={8} />}

        {/* Content */}
        {!loading && !error && (
          <>
            {filteredNotes.length > 0 ? (
              <NotesGrid notes={filteredNotes} />
            ) : (
              <NotesEmpty
                search={search}
                subject={subject}
                onReset={handleReset}
              />
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default NotesPage;