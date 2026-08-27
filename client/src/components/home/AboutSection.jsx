import { BookOpen, FileText, Users } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="border-t border-slate-100 bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            About NoteHub
          </p>

          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Learn, Share, and Grow Together
          </h2>

          <p className="mt-4 text-base leading-relaxed text-slate-600">
            NoteHub is a student-driven platform where you can discover,
            share, and access verified study notes in one clean place. Our
            mission is to make academic resources universally accessible and organized.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <div className="group rounded-2xl border border-slate-200/90 bg-slate-50/60 p-8 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-300/80 hover:bg-white hover:shadow-xl hover:shadow-indigo-500/10">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-600 shadow-inner transition-transform duration-300 group-hover:scale-110">
              <BookOpen size={24} />
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-900">
              Discover Quality Notes
            </h3>

            <p className="mt-2.5 text-sm leading-relaxed text-slate-500">
              Browse organized notes across disciplines and verified by student reviews to supercharge your study sessions.
            </p>
          </div>

          <div className="group rounded-2xl border border-slate-200/90 bg-slate-50/60 p-8 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-300/80 hover:bg-white hover:shadow-xl hover:shadow-indigo-500/10">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-600 shadow-inner transition-transform duration-300 group-hover:scale-110">
              <FileText size={24} />
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-900">
              Share Your Knowledge
            </h3>

            <p className="mt-2.5 text-sm leading-relaxed text-slate-500">
              Upload your best notes, create customized cover thumbnails, and help your peers learn more effectively.
            </p>
          </div>

          <div className="group rounded-2xl border border-slate-200/90 bg-slate-50/60 p-8 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-300/80 hover:bg-white hover:shadow-xl hover:shadow-indigo-500/10">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-600 shadow-inner transition-transform duration-300 group-hover:scale-110">
              <Users size={24} />
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-900">
              Peer Moderation
            </h3>

            <p className="mt-2.5 text-sm leading-relaxed text-slate-500">
              Ensure community integrity with our review system that keeps materials spam-free, accurate, and relevant.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;