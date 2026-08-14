import { Search } from "lucide-react";

function SearchBar() {
  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search notes, subjects, topics..."
            className="w-full rounded-xl border border-gray-200 bg-white py-4 pl-12 pr-4 text-sm text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:text-base"
          />
        </div>
      </div>
    </section>
  );
}

export default SearchBar;