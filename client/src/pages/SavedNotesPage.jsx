import { Bookmark, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import SavedNoteCard from "../components/notes/SavedNoteCard";
import { useSavedNotes } from "../context/SavedNoteContext";

const SavedNotesPage = () => {
  const {
    savedNotes,
    loading,
    fetchSavedNotes,
    unsaveNote,
  } = useSavedNotes();

  const [removingId, setRemovingId] = useState(null);

  useEffect(() => {
    fetchSavedNotes();
  }, []);

  const handleUnsave = async (noteId) => {
  try {
    setRemovingId(noteId);

    await unsaveNote(noteId);
  } catch (error) {
    console.error("Failed to remove saved note:", error);
  } finally {
    setRemovingId(null);
  }
};

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
              <Bookmark size={24} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Saved Notes
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Notes you've saved for later
              </p>
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-96 animate-pulse rounded-2xl border border-gray-200 bg-white"
              />
            ))}
          </div>
        ) : savedNotes.length === 0 ? (
          /* Empty State */
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500">
              <FileText size={30} />
            </div>

            <h2 className="mt-5 text-xl font-bold text-gray-900">
              No saved notes yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              Save useful notes while browsing and they will appear here
              so you can easily find them later.
            </p>
          </div>
        ) : (
          /* Saved Notes */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {savedNotes.map((savedNote) => (
              <SavedNoteCard
                key={savedNote._id}
                note={savedNote.noteId}
                onUnsave={handleUnsave}
                removing={removingId === savedNote.noteId?._id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedNotesPage;