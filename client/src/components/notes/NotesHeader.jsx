import { FileText } from "lucide-react";

const NotesHeader = ({ totalNotes = 0 }) => {
  return (
    <div className="mb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-indigo-100/80 bg-indigo-50/70 px-3.5 py-1 text-xs font-bold text-indigo-600">
            <FileText size={14} />
            <span>Academic Library</span>
          </div>

          <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Explore Study Notes
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Discover peer-contributed study guides, revision sheets, and lecture summaries organized by subject.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white px-5 py-3.5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Available Notes
          </p>

          <p className="mt-1 font-display text-3xl font-extrabold text-slate-900">
            {totalNotes}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotesHeader;