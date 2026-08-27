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
    <section className="relative z-20 -mt-7 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="relative">
          {/* Search Input Container */}
          <div className="relative flex items-center">
            <Search
              size={20}
              className="pointer-events-none absolute left-5 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search notes, subjects, topics, or study guides..."
              className="h-14 w-full rounded-2xl border border-slate-200/90 bg-white/95 pl-13 pr-5 text-sm text-slate-800 shadow-lg shadow-slate-200/60 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 sm:text-base"
            />
          </div>

          {/* Results Dropdown */}
          {search.trim() && (
            <div className="absolute left-0 right-0 top-full mt-2.5 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 shadow-2xl shadow-slate-200/80 backdrop-blur-md">
              {loading ? (
                <div className="flex items-center justify-center gap-2.5 px-5 py-7 text-sm font-medium text-slate-500">
                  <Loader2
                    size={19}
                    className="animate-spin text-indigo-600"
                  />
                  <span>Searching library...</span>
                </div>
              ) : results.length > 0 ? (
                <div className="max-h-96 divide-y divide-slate-100 overflow-y-auto">
                  {results.map((note) => (
                    <Link
                      key={note._id}
                      to={`/notes/${note._id}`}
                      onClick={() => setSearch("")}
                      className="flex items-center gap-4 px-5 py-3.5 transition hover:bg-indigo-50/50"
                    >
                      {/* Icon */}
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                        <FileText size={20} />
                      </div>

                      {/* Note information */}
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-sm font-semibold text-slate-800">
                          {note.title}
                        </h3>

                        <div className="mt-1 flex flex-wrap items-center gap-x-2 text-xs text-slate-500">
                          {note.subject && (
                            <span className="font-medium text-indigo-600">
                              {note.subject}
                            </span>
                          )}

                          {note.category?.name && (
                            <>
                              <span className="text-slate-300">•</span>
                              <span>{note.category.name}</span>
                            </>
                          )}
                        </div>

                        {note.uploadedBy?.name && (
                          <p className="mt-0.5 text-xs text-slate-400">
                            by {note.uploadedBy.name}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="px-5 py-9 text-center">
                  <FileText
                    size={30}
                    className="mx-auto text-slate-300"
                  />

                  <p className="mt-2 text-sm font-semibold text-slate-700">
                    No matching notes found
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Try searching for another subject or broader keyword.
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