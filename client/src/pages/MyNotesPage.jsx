import { useEffect, useState } from "react";
import { Upload } from "lucide-react";
import { Link } from "react-router-dom";

import { useNotes } from "../context/NoteContext";

import MyNotesGrid from "../components/notes/MyNotesGrid";
import MyNotesEmpty from "../components/notes/MyNotesEmpty";
import MyNotesSkeleton from "../components/notes/MyNotesSkeleton";

const MyNotesPage = () => {
  const {
    notes,
    loading,
    error,
    fetchMyNotes,
    deleteNote,
  } = useNotes();

  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchMyNotes();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      await deleteNote(id);
    } catch (error) {
      console.error("Failed to delete note:", error);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-indigo-600">
              My Notes
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
              Your Uploaded Notes
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage the notes you have shared with the community.
            </p>
          </div>

          <Link
            to="/notes/upload"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            <Upload size={18} />
            Upload Note
          </Link>
        </div>

        {/* Loading */}
        {loading && <MyNotesSkeleton count={6} />}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-600">
              {error}
            </p>

            <button
              type="button"
              onClick={fetchMyNotes}
              className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && notes.length === 0 && (
          <MyNotesEmpty />
        )}

        {/* Notes */}
        {!loading && !error && notes.length > 0 && (
          <>
            <div className="mb-5">
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-900">
                  {notes.length}
                </span>{" "}
                {notes.length === 1 ? "note" : "notes"} uploaded
              </p>
            </div>

            <MyNotesGrid
              notes={notes}
              onDelete={handleDelete}
              deletingId={deletingId}
            />
          </>
        )}
      </div>
    </main>
  );
};

export default MyNotesPage;