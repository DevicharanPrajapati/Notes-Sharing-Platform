import { FileText } from "lucide-react";

const NotesHeader = ({ totalNotes = 0 }) => {
  return (
    <div className="mb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
              <FileText size={20} />
            </div>

            <span className="text-sm font-semibold text-indigo-600">
              Study Resources
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Explore Notes
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
            Find useful study notes, guides, and resources shared by students.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Total Notes
          </p>

          <p className="mt-1 text-2xl font-bold text-gray-900">
            {totalNotes}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotesHeader;