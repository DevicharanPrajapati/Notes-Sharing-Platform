import { Link } from "react-router-dom";
import { BookOpen, Sparkles, Upload, ArrowRight } from "lucide-react";

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/70 via-white to-slate-50/60 py-20 sm:py-28">
      {/* Ambient background glow orbs */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-400/20 to-purple-400/20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -left-20 -z-10 h-72 w-72 rounded-full bg-indigo-300/15 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -right-20 -z-10 h-72 w-72 rounded-full bg-purple-300/15 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">

          {/* Pill Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100/80 bg-white/90 px-4 py-1.5 text-xs font-semibold tracking-wide text-indigo-600 shadow-sm shadow-indigo-100/50 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
            <Sparkles size={14} className="text-indigo-500" />
            <span>Open Educational Resource Hub</span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
            Share Knowledge.
            <span className="mt-2 block bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 bg-clip-text text-transparent">
              Learn Together.
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Discover, upload, and exchange peer-reviewed study notes and exam preparation materials. Empower your academic journey with collaborative resources.
          </p>

          {/* Actions */}
          <div className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <Link
              to="/notes"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:from-indigo-500 hover:to-indigo-600 hover:shadow-indigo-500/35 hover:-translate-y-0.5 active:translate-y-0 sm:w-auto"
            >
              <BookOpen size={18} />
              <span>Browse Notes</span>
              <ArrowRight size={16} className="ml-0.5" />
            </Link>

            <Link
              to="/notes/upload"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200/90 bg-white/90 px-7 py-3.5 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-indigo-200 hover:bg-indigo-50/50 hover:text-indigo-600 hover:-translate-y-0.5 active:translate-y-0 sm:w-auto"
            >
              <Upload size={18} />
              <span>Upload Notes</span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

export default HeroSection;