import { ArrowRight, BookOpen, FolderOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

import { useCategories } from "../../context/CategoryContext";

function CategorySection() {
  const {
    categories,
    loading,
    error,
    fetchCategories,
  } = useCategories();

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold text-indigo-600">
              Explore
            </p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
              Browse Categories
            </h2>
          </div>

          <Link
            to="/categories"
            className="hidden items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700 sm:flex"
          >
            View All
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-36 animate-pulse rounded-xl border border-gray-200 bg-white"
              />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && categories.length === 0 && (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
            <FolderOpen
              size={32}
              className="mx-auto text-gray-400"
            />

            <p className="mt-3 text-sm text-gray-500">
              No categories available.
            </p>
          </div>
        )}

        {/* Categories */}
        {!loading && !error && categories.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.slice(0, 4).map((category) => (
              <Link
                key={category._id}
                to={`/category/${category.slug}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300/80 hover:shadow-xl hover:shadow-indigo-500/10"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-600 shadow-inner">
                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <BookOpen size={22} />
                    )}
                  </div>

                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-colors duration-200 group-hover:bg-indigo-50 group-hover:text-indigo-600">
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <h3 className="text-base font-bold text-slate-800 transition-colors group-hover:text-indigo-600">
                    {category.name}
                  </h3>

                  <div className="mt-2 flex items-center gap-1.5">
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                      {category.notesCount || 0}{" "}
                      {category.notesCount === 1 ? "note" : "notes"}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Mobile View All */}
        <div className="mt-5 sm:hidden">
          <Link
            to="/categories"
            className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            View All Categories
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CategorySection;