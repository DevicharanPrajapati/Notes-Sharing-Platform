import { useEffect, useState } from "react";
import { ArrowLeft, Download, FileText, Eye } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useNotes } from "../context/NoteContext";

const NoteDetailsPage = () => {
  const { id } = useParams();
  const { getSingleNote, error } = useNotes();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNote = async () => {
      try {
        const data = await getSingleNote(id);
        setNote(data);
      } catch (error) {
        console.error("Failed to load note:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNote();
  }, [id]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex items-center gap-3 text-gray-500">
          <span className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
          Loading note...
        </div>
      </main>
    );
  }

  if (error || !note) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <FileText className="mx-auto text-gray-400" size={48} />

          <h1 className="mt-4 text-xl font-bold text-gray-900">
            Note not found
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {error || "The note you're looking for doesn't exist."}
          </p>

          <Link
            to="/notes"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            <ArrowLeft size={17} />
            Back to Notes
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back */}
        <Link
          to="/notes"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-indigo-600"
        >
          <ArrowLeft size={17} />
          Back to Notes
        </Link>

        {/* Note */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-2">
            {/* Thumbnail */}
            <div className="min-h-[320px] bg-gray-100">
              {note.thumbnail ? (
                <img
                  src={note.thumbnail}
                  alt={note.title}
                  className="h-full min-h-[320px] w-full object-cover"
                />
              ) : (
                <div className="flex h-full min-h-[320px] items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
                  <FileText size={80} className="text-indigo-400" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex flex-col p-6 sm:p-8 lg:p-10">
              {note.subject && (
                <span className="w-fit rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600">
                  {note.subject}
                </span>
              )}

              <h1 className="mt-5 text-3xl font-bold text-gray-900">
                {note.title}
              </h1>

              <p className="mt-5 leading-7 text-gray-600">
                {note.description || "No description available."}
              </p>

              <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row">
                <Link
                  to={`/notes/${note._id}/view`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  <Eye size={18} />
                  View PDF
                </Link>

                <a
                  href={note.file}
                  download
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  <Download size={18} />
                  Download Note
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NoteDetailsPage;
