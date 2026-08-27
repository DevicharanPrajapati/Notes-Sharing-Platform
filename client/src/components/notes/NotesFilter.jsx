import { Filter, Folder, ChevronDown, BookOpen } from "lucide-react";

const NotesFilter = ({
  // Optional Category filter props
  category,
  setCategory,
  categories = [],
  categoriesLoading = false,

  // Subject filter props
  subject,
  setSubject,
  subjects = [],
}) => {
  const hasCategoryFilter = typeof setCategory === "function";

  return (
    <div
      className={
        hasCategoryFilter
          ? "grid grid-cols-1 gap-4 sm:grid-cols-2"
          : "w-full"
      }
    >
      {/* Category Selector (if enabled) */}
      {hasCategoryFilter && (
        <div className="w-full">
          <label
            htmlFor="category-filter"
            className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500"
          >
            <Folder size={13} className="text-slate-400" />
            <span>Category</span>
          </label>

          <div className="relative w-full">
            <Folder
              size={17}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              id="category-filter"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={categoriesLoading}
              className="h-12 w-full appearance-none rounded-xl border border-slate-200/90 bg-white pl-11 pr-10 text-sm font-medium text-slate-700 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 disabled:cursor-not-allowed disabled:bg-slate-50 cursor-pointer"
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

            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>
        </div>
      )}

      {/* Subject Selector */}
      <div className="w-full">
        <label
          htmlFor="subject-filter"
          className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500"
        >
          <BookOpen size={13} className="text-slate-400" />
          <span>Subject</span>
        </label>

        <div className="relative w-full">
          <Filter
            size={17}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <select
            id="subject-filter"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="h-12 w-full appearance-none rounded-xl border border-slate-200/90 bg-white pl-11 pr-10 text-sm font-medium text-slate-700 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 cursor-pointer"
          >
            <option value="">All Subjects</option>

            {subjects.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
        </div>
      </div>
    </div>
  );
};

export default NotesFilter;