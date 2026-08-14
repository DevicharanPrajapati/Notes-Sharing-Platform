import { ArrowLeft, Upload } from "lucide-react";
import { Link } from "react-router-dom";

import NoteUploadForm from "../components/notes/NoteUploadForm";

const UploadNotePage = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {/* Top navigation */}
        <div className="mb-8">
          <Link
            to="/notes"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-indigo-600"
          >
            <ArrowLeft size={17} />
            Back to Notes
          </Link>
        </div>

        {/* Page heading */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
            <Upload size={27} />
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Share Your Notes
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
            Upload your study material and help other students learn better.
          </p>
        </div>

        {/* Upload form */}
        <NoteUploadForm />

        {/* Bottom information */}
        <div className="mx-auto mt-6 max-w-3xl rounded-xl border border-indigo-100 bg-indigo-50 p-4">
          <p className="text-center text-sm leading-6 text-indigo-700">
            Make sure your notes are clear, useful, and relevant to the selected
            subject before uploading.
          </p>
        </div>
      </div>
    </main>
  );
};

export default UploadNotePage;