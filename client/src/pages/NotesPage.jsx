import { useEffect, useState } from "react";
import { RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";

import { useNotes } from "../context/NoteContext";
import { useCategories } from "../context/CategoryContext";

import NotesHeader from "../components/notes/NotesHeader";
import NotesSearch from "../components/notes/NotesSearch";
import NotesFilter from "../components/notes/NotesFilter";
import NotesGrid from "../components/notes/NotesGrid";
import NotesEmpty from "../components/notes/NotesEmpty";
import NotesSkeleton from "../components/notes/NotesSkeleton";

const NotesPage = () => {
  const {
    notes,
    pagination,
    loading,
    error,
    fetchNotes,
  } = useNotes();

  const {
    categories,
    loading: categoriesLoading,
    fetchCategories,
  } = useCategories();

  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");

  const [page, setPage] = useState(1);

  const limit = 10;

  // Load categories
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch notes
  useEffect(() => {
    fetchNotes({
      search,
      subject,
      category,
      page,
      limit,
    });
  }, [search, subject, category, page]);

  // Get unique subjects from currently loaded notes
  const subjects = [
    ...new Set(notes.map((note) => note.subject).filter(Boolean)),
  ];

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleSubjectChange = (value) => {
    setSubject(value);
    setPage(1);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    setPage(1);
  };

  const handleReset = () => {
    setSearch("");
    setSubject("");
    setCategory("");
    setPage(1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (page < pagination.totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const hasFilters = search || subject || category;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

        {/* Header */}
        <NotesHeader totalNotes={pagination.totalNotes} />

        {/* Search + Filter */}
        <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">

          {/* Search */}
          <div className="mb-3">
            <NotesSearch
              search={search}
              setSearch={handleSearchChange}
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-3 sm:flex-row">

            {/* Category */}
            <div className="flex-1">
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Category
              </label>

              <select
                id="category"
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                disabled={categoriesLoading}
                className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-gray-50"
              >
                <option value="">
                  {categoriesLoading
                    ? "Loading categories..."
                    : "All Categories"}
                </option>

                {categories
                  .filter((item) => item.isActive)
                  .map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Subject */}
            <div className="flex-1">
              <NotesFilter
                subject={subject}
                setSubject={handleSubjectChange}
                subjects={subjects}
              />
            </div>
          </div>

          {/* Results info */}
          {!loading && (
            <div className="mt-4 flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-semibold text-gray-900">
                  {notes.length}
                </span>{" "}
                {notes.length === 1 ? "note" : "notes"}
                {pagination.totalNotes > 0 && (
                  <>
                    {" "}
                    of{" "}
                    <span className="font-semibold text-gray-900">
                      {pagination.totalNotes}
                    </span>
                  </>
                )}
              </p>

              {hasFilters && (
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
            <p className="text-sm font-medium text-red-600">
              {error}
            </p>

            <button
              type="button"
              onClick={() =>
                fetchNotes({
                  search,
                  subject,
                  category,
                  page,
                  limit,
                })
              }
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
            {notes.length > 0 ? (
              <>
                <NotesGrid notes={notes} />

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="mt-10 flex items-center justify-center gap-3">

                    <button
                      type="button"
                      onClick={handlePreviousPage}
                      disabled={page === 1}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ChevronLeft size={17} />
                      Previous
                    </button>

                    <div className="rounded-xl bg-indigo-50 px-4 py-2.5 text-sm font-semibold text-indigo-600">
                      Page {page} of {pagination.totalPages}
                    </div>

                    <button
                      type="button"
                      onClick={handleNextPage}
                      disabled={page >= pagination.totalPages}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Next
                      <ChevronRight size={17} />
                    </button>

                  </div>
                )}
              </>
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