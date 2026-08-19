import { useEffect, useState } from "react";
import { ArrowLeft, FileText } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { useCategories } from "../context/CategoryContext";
import { useNotes } from "../context/NoteContext";

const CategoryNotesPage = () => {
  const { slug } = useParams();

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
            <p className="text-sm font-semibold text-indigo-600">
              Category
            </p>

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
        {!loading &&
          !error &&
          notes.length === 0 && (
            <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
              <FileText
                size={42}
                className="mx-auto text-gray-300"
              />

              <h2 className="mt-4 text-lg font-semibold text-gray-900">
                No notes found
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                There are no approved notes in this category yet.
              </p>
            </div>
          )}

        {/* Notes */}
        {!loading &&
          !error &&
          notes.length > 0 && (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {notes.map((note) => (
                <article
                  key={note._id}
                  className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                      <FileText size={22} />
                    </div>

                    {note.subject && (
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                        {note.subject}
                      </span>
                    )}
                  </div>

                  <h2 className="mt-5 line-clamp-2 text-lg font-semibold text-gray-900">
                    {note.title}
                  </h2>

                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                    {note.description ||
                      "No description available."}
                  </p>

                  <p className="mt-3 text-xs text-gray-400">
                    Uploaded by{" "}
                    <span className="font-medium text-gray-600">
                      {note.uploadedBy?.name || "Unknown"}
                    </span>
                  </p>

                  <Link
                    to={`/notes/${note._id}`}
                    className="mt-5 inline-flex text-sm font-semibold text-indigo-600 transition hover:text-indigo-700"
                  >
                    View Note
                  </Link>
                </article>
              ))}
            </div>
          )}
      </div>
    </main>
  );
};

export default CategoryNotesPage;