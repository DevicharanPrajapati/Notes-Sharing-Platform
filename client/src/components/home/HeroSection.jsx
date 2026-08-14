import { Link } from "react-router-dom";
import { BookOpen, Upload } from "lucide-react";

function HeroSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">

          {/* Small Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600">
            <BookOpen size={16} />
            <span>Learn. Share. Grow.</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Share Knowledge.
            <span className="block text-indigo-600">
              Learn Together.
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            Discover, upload, and share study notes with students.
            Find the resources you need and help others learn from
            your knowledge.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

            <Link
              to="/notes"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              <BookOpen size={18} />
              Browse Notes
            </Link>

            <Link
              to="/notes/upload"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              <Upload size={18} />
              Upload Notes
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
}

export default HeroSection;