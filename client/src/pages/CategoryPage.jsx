import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FolderOpen } from "lucide-react";

import { useCategories } from "../context/CategoryContext";

const CategoryPage = () => {
  const { categories, loading, error, fetchCategories } = useCategories();

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Browse Categories
          </h1>

          <p className="mt-3 max-w-2xl text-gray-500">
            Explore study notes by category and find the resources you need.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex min-h-[250px] items-center justify-center">
            <div className="flex items-center gap-3 text-gray-500">
              <span className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
              Loading categories...
            </div>
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-600">
            {error}
          </div>
        ) : categories.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">
            <FolderOpen size={40} className="mx-auto text-gray-400" />

            <h2 className="mt-4 text-lg font-semibold text-gray-900">
              No categories available
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Categories will appear here once they are created.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <div
                key={category._id}
                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md"
              >
                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-full w-full rounded-xl object-cover"
                    />
                  ) : (
                    <FolderOpen size={22} />
                  )}
                </div>

                {/* Content */}
                <h2 className="mt-5 text-lg font-semibold text-gray-900">
                  {category.name}
                </h2>

                <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                  {category.description || "Explore notes in this category."}
                </p>

                {/* Footer */}
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {category.notesCount || 0}{" "}
                    {category.notesCount === 1 ? "note" : "notes"}
                  </span>

                  <Link
                    to={`/category/${category.slug}`}
                    className="text-sm font-semibold text-indigo-600 transition group-hover:text-indigo-700"
                  >
                    View Notes →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default CategoryPage;
