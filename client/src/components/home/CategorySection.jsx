import { ArrowRight, BookOpen, FileText, FolderOpen } from "lucide-react";
import { Link } from "react-router-dom";

function CategorySection() {
  const categories = [
    {
      name: "Computer Science",
      icon: BookOpen,
      count: "120+ Notes",
    },
    {
      name: "Database",
      icon: FolderOpen,
      count: "80+ Notes",
    },
    {
      name: "Programming",
      icon: FileText,
      count: "150+ Notes",
    },
    {
      name: "Web Development",
      icon: BookOpen,
      count: "90+ Notes",
    },
  ];

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold text-indigo-600">
              Explore
            </p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
              Browse Categories
            </h2>
          </div>

          <Link
            to="/categories"
            className="hidden items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700 sm:flex"
          >
            View All
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.name}
                to="/categories"
                className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    <Icon size={22} />
                  </div>

                  <ArrowRight
                    size={18}
                    className="text-gray-300 transition group-hover:translate-x-1 group-hover:text-indigo-600"
                  />
                </div>

                <h3 className="mt-4 font-semibold text-gray-900">
                  {category.name}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {category.count}
                </p>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default CategorySection;