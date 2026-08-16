import { FileText, Upload } from "lucide-react";
import { Link } from "react-router-dom";

const MyNotesEmpty = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500">
        <FileText size={30} />
      </div>

      <h2 className="mt-5 text-xl font-bold text-gray-900">
        You haven't uploaded any notes yet
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
        Share your study material with other students and help them
        learn better.
      </p>

      <Link
        to="/notes/upload"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
      >
        <Upload size={18} />
        Upload Your First Note
      </Link>
    </div>
  );
};

export default MyNotesEmpty;