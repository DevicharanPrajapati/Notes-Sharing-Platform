import { useEffect, useState } from "react";
import { ArrowLeft, FileText, Bookmark } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { useCategories } from "../context/CategoryContext";
import { useNotes } from "../context/NoteContext";
import { useSavedNotes } from "../context/SavedNoteContext";
import NotesGrid from "../components/notes/NotesGrid";

const CategoryNotesPage = () => {
  const { slug } = useParams();
  const { saveNote, unsaveNote, checkSavedNote } = useSavedNotes();

  const [savedNotes, setSavedNotes] = useState({});
  const [savingId, setSavingId] = useState(null);

  const handleSaveToggle = async (noteId) => {
    try {
      setSavingId(noteId);

      if (savedNotes[noteId]) {
        await unsaveNote(noteId);

        setSavedNotes((prev) => ({
          ...prev,
          [noteId]: false,
        }));
      } else {
        await saveNote(noteId);

        setSavedNotes((prev) => ({
          ...prev,
          [noteId]: true,
        }));
      }
    } catch (error) {
      console.error("Failed to update saved note:", error);
    } finally {
      setSavingId(null);
    }
  };

  const {
    fetchCategoryBySlug,
    loading: categoryLoading,
    error: categoryError,
  } = useCategories();

  const {
    notes,
    loading: notesLoading,
    error: notesError,
    fetchNotes,
  } = useNotes();

  const [category, setCategory] = useState(null);

  useEffect(() => {
    const loadCategoryNotes = async () => {
      try {
        const categoryData = await fetchCategoryBySlug(slug);

        setCategory(categoryData);

        if (categoryData?._id) {
          await fetchNotes({
            category: categoryData._id,
            page: 1,
            limit: 12,
          });
        }
      } catch (error) {
        console.error("Failed to load category notes:", error);
      }
    };

    if (slug) {
      loadCategoryNotes();
    }
  }, [slug]);

  const loading = categoryLoading || notesLoading;
  const error = categoryError || notesError;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Back */}
        <Link
          to="/categories"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-indigo-600"
        >
          <ArrowLeft size={17} />
          Back to Categories
        </Link>

        {/* Category Header */}
        {!loading && category && (
          <div className="mb-8">
            <p className="text-sm font-semibold text-indigo-600">Category</p>

            <h1 className="mt-1 text-3xl font-bold text-gray-900 sm:text-4xl">
              {category.name}
            </h1>

            {category.description && (
              <p className="mt-3 max-w-2xl text-gray-500">
                {category.description}
              </p>
            )}

            <p className="mt-3 text-sm text-gray-400">
              {notes.length} notes available
            </p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-52 animate-pulse rounded-xl border border-gray-200 bg-white"
              />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && notes.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
            <FileText size={42} className="mx-auto text-gray-300" />

            <h2 className="mt-4 text-lg font-semibold text-gray-900">
              No notes found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              There are no approved notes in this category yet.
            </p>
          </div>
        )}

        {/* Notes */}
        {!loading && !error && notes.length > 0 && <NotesGrid notes={notes} />}
      </div>
    </main>
  );
};

export default CategoryNotesPage;
