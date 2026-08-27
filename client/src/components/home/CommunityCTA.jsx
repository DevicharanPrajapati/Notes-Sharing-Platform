import { Link } from "react-router-dom";
import { Upload, Users } from "lucide-react";

function CommunityCTA() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 px-8 py-12 shadow-2xl shadow-indigo-500/20 sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between">
        {/* Background glow orb */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 left-1/3 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl" />

        {/* Content */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1 text-xs font-semibold tracking-wide text-indigo-100 backdrop-blur-md">
            <Users size={15} />
            <span>Join 10,000+ Learners</span>
          </div>

          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Have study materials?
            <br className="hidden sm:inline" />
            {" "}Share them with your peers.
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-relaxed text-indigo-100 sm:text-base">
            Upload your lecture notes, summaries, and revision guides. Help other students achieve academic excellence.
          </p>
        </div>

        {/* Action Button */}
        <div className="relative z-10 mt-8 shrink-0 lg:mt-0">
          <Link
            to="/notes/upload"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-indigo-600 shadow-lg shadow-black/10 transition-all duration-200 hover:bg-slate-50 hover:shadow-xl hover:shadow-black/15 hover:-translate-y-0.5 active:translate-y-0"
          >
            <Upload size={18} />
            <span>Upload Your Notes</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CommunityCTA;