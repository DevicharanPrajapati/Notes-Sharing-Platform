import { useEffect, useState } from "react";
import { Search, FileText, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

import api from "../../services/api";

function SearchBar() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const value = search.trim();

    if (!value) {
      setResults([]);
      setLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const response = await api.get("/api/notes", {
          params: {
            search: value,
            page: 1,
            limit: 5,
          },
        });

        setResults(response.data.notes || []);
      } catch (error) {
        console.error("Search failed:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <section className="relative z-20 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="relative">
          {/* Search Input */}
          <Search
            size={20}
            className="absolute left-4 top-5 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notes, subjects, topics..."
            className="w-full rounded-xl border border-gray-200 bg-white py-4 pl-12 pr-4 text-sm text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:text-base"
          />

          {/* Results */}
          {search.trim() && (
            <div className="absolute left-0 right-0 top-full mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
              {loading ? (
                <div className="flex items-center justify-center gap-2 px-5 py-6 text-sm text-gray-500">
                  <Loader2
                    size={18}
                    className="animate-spin text-indigo-600"
                  />
                  Searching...
                </div>
              ) : results.length > 0 ? (
                <div className="max-h-96 overflow-y-auto">
                  {results.map((note) => (
                    <Link
                      key={note._id}
                      to={`/notes/${note._id}`}
                      onClick={() => setSearch("")}
                      className="flex items-center gap-4 border-b border-gray-100 px-5 py-4 transition last:border-b-0 hover:bg-gray-50"
                    >
                      {/* Icon */}
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                        <FileText size={19} />
                      </div>

                      {/* Note information */}
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-sm font-semibold text-gray-900">
                          {note.title}
                        </h3>

                        <div className="mt-1 flex flex-wrap gap-x-2 text-xs text-gray-500">
                          {note.subject && (
                            <span>{note.subject}</span>
                          )}

                          {note.category?.name && (
                            <>
                              <span>•</span>
                              <span>{note.category.name}</span>
                            </>
                          )}
                        </div>

                        {note.uploadedBy?.name && (
                          <p className="mt-1 text-xs text-gray-400">
                            Uploaded by {note.uploadedBy.name}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="px-5 py-8 text-center">
                  <FileText
                    size={28}
                    className="mx-auto text-gray-300"
                  />

                  <p className="mt-2 text-sm font-medium text-gray-700">
                    No notes found
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    Try searching for another subject or topic.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default SearchBar;