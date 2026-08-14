import { Search, X } from "lucide-react";

const NotesSearch = ({ search, setSearch }) => {
  const handleClear = () => {
    setSearch("");
  };

  return (
    <div className="relative w-full">
      <Search
        size={20}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search notes by title, description..."
        className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-11 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
      />

      {search && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};

export default NotesSearch;