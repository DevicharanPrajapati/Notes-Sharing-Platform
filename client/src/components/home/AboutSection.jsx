import { BookOpen, FileText, Users } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-indigo-600">
            About NoteSharing
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
            Learn, Share, and Grow Together
          </h2>

          <p className="mt-4 text-sm leading-6 text-gray-500 sm:text-base">
            NoteSharing is a platform where students can discover,
            share, and access useful study notes in one place. Our
            goal is to make learning resources easier to find and
            easier to share.
          </p>
        </div>

        {/* Features */}
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <BookOpen size={22} />
            </div>

            <h3 className="mt-4 font-semibold text-gray-900">
              Discover Notes
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Find notes across different subjects and categories
              to support your studies.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <FileText size={22} />
            </div>

            <h3 className="mt-4 font-semibold text-gray-900">
              Share Knowledge
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Upload your useful notes and help other students
              learn from your resources.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Users size={22} />
            </div>

            <h3 className="mt-4 font-semibold text-gray-900">
              Learn Together
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Build a helpful learning community by sharing
              knowledge and resources.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;