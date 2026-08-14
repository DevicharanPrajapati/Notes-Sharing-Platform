import { Link } from "react-router-dom";
import { Upload, Users } from "lucide-react";

function CommunityCTA() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl bg-indigo-600 px-6 py-10 sm:px-10 lg:flex lg:items-center lg:justify-between">

        {/* Content */}
        <div>
          <div className="flex items-center gap-2 text-indigo-200">
            <Users size={20} />

            <span className="text-sm font-semibold">
              Join the community
            </span>
          </div>

          <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
            Have useful notes?
            <br className="sm:hidden" />
            Share them with others.
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-6 text-indigo-100 sm:text-base">
            Upload your study materials and help other students
            learn faster.
          </p>
        </div>

        {/* Button */}
        <Link
          to="/notes/upload"
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-indigo-600 transition hover:bg-gray-100 lg:mt-0"
        >
          <Upload size={18} />
          Upload a Note
        </Link>

      </div>
    </section>
  );
}

export default CommunityCTA;