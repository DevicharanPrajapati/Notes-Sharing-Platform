import { ArrowRight, FileText } from "lucide-react";
import { Link } from "react-router-dom";

function RecentNotes() {
  const recentNotes = [
    {
      id: 1,
      title: "Java Programming Notes",
      category: "Programming",
      author: "Prajapati",
    },
    {
      id: 2,
      title: "Database Management System",
      category: "Database",
      author: "Rahul",
    },
    {
      id: 3,
      title: "Web Development Basics",
      category: "Web Development",
      author: "Dev",
    },
  ];

  return (
    <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold text-indigo-600">
              Recently Added
            </p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
              Recent Notes
            </h2>
          </div>

          <Link
            to="/notes"
            className="hidden items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700 sm:flex"
          >
            View All
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Notes */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {recentNotes.map((note) => (
            <div
              key={note.id}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start justify-between">

                {/* Icon */}
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <FileText size={22} />
                </div>

                {/* Category */}
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                  {note.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="mt-5 font-semibold text-gray-900">
                {note.title}
              </h3>

              {/* Author */}
              <p className="mt-2 text-sm text-gray-500">
                Uploaded by {note.author}
              </p>

              {/* View */}
              <Link
                to={`/notes/${note.id}`}
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
              >
                View Note
                <ArrowRight size={15} />
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default RecentNotes;