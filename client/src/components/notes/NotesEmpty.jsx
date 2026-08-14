import { FileSearch, RotateCcw } from "lucide-react";

const NotesEmpty = ({ search = "", subject = "", onReset }) => {
  return (
    <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-gray-400 shadow-sm">
          <FileSearch size={30} />
        </div>

        <h3 className="mt-5 text-lg font-bold text-gray-900">
          No notes found
        </h3>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          {search || subject
            ? "No notes match your current search or filter. Try changing your search criteria."
            : "There are no notes available right now."}
        </p>

        {(search || subject) && onReset && (
          <button
            type="button"
            onClick={onReset}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            <RotateCcw size={16} />
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
};

export default NotesEmpty;