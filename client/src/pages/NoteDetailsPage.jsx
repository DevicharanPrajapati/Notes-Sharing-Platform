import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Download,
  Eye,
  FileText,
  User,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { useNotes } from "../context/NoteContext";

const NoteDetailsPage = () => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { id } = useParams();
  const { getSingleNote, getNoteDownloadUrl, error } = useNotes();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNote = async () => {
      try {
        setLoading(true);

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
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
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
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-indigo-600"
        >
          <ArrowLeft size={17} />
          Back to Notes
        </Link>

        {/* Main Card */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            {/* Preview */}
            <div className="flex min-h-[360px] items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-8 lg:min-h-[560px]">
              {note.thumbnail ? (
                <img
                  src={note.thumbnail}
                  alt={note.title}
                  className="max-h-[500px] w-full rounded-xl object-cover shadow-md"
                />
              ) : (
                <div className="flex w-full max-w-sm flex-col items-center justify-center rounded-2xl border border-indigo-100 bg-white p-12 shadow-sm">
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                    <FileText size={48} />
                  </div>

                  <p className="mt-5 text-sm font-semibold text-gray-700">
                    PDF Note
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    Open the document to start reading
                  </p>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col p-6 sm:p-8 lg:p-10">
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {note.category?.name && (
                  <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600">
                    {note.category.name}
                  </span>
                )}

                {note.subject && (
                  <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-600">
                    {note.subject}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="mt-5 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
                {note.title}
              </h1>

              {/* Description */}
              <div className="mt-6">
                <h2 className="text-sm font-semibold text-gray-900">
                  About this note
                </h2>

                <div className="mt-3 rounded-xl border border-gray-100 bg-gray-50 p-4 sm:p-5">
                  <p
                    className={`whitespace-pre-line text-sm leading-7 text-gray-600 sm:text-base ${
                      !showFullDescription ? "line-clamp-4" : ""
                    }`}
                  >
                    {note.description || "No description available."}
                  </p>

                  {note.description && note.description.length > 250 && (
                    <button
                      type="button"
                      onClick={() => setShowFullDescription((prev) => !prev)}
                      className="mt-3 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                      {showFullDescription ? "Show less" : "Read more"}
                    </button>
                  )}
                </div>
              </div>

              {/* Uploader */}
              <div className="mt-7 rounded-xl border border-gray-100 bg-gray-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                    <User size={19} />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Uploaded by</p>

                    <p className="text-sm font-semibold text-gray-900">
                      {note.uploadedBy?.name || "Unknown user"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-gray-100 p-4">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Download size={16} />

                    <span className="text-xs">Downloads</span>
                  </div>

                  <p className="mt-2 text-lg font-bold text-gray-900">
                    {note.downloads || 0}
                  </p>
                </div>

                <div className="rounded-xl border border-gray-100 p-4">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar size={16} />

                    <span className="text-xs">Added</span>
                  </div>

                  <p className="mt-2 text-sm font-semibold text-gray-900">
                    {note.createdAt
                      ? new Date(note.createdAt).toLocaleDateString()
                      : "Unknown"}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row">
                <Link
                  to={`/notes/${note._id}/view`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  <Eye size={18} />
                  View PDF
                </Link>

                <a
                  href={getNoteDownloadUrl(note._id)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  <Download size={18} />
                  Download
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
