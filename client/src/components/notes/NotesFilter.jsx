import { Filter } from "lucide-react";

const NotesFilter = ({ subject, setSubject, subjects = [] }) => {
  return (
    <div className="relative w-full sm:w-56">
      <Filter
        size={18}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <select
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="h-12 w-full appearance-none rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
      >
        <option value="">All Subjects</option>

        {subjects.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default NotesFilter;