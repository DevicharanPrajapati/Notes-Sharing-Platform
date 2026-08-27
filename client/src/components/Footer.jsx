import { Link } from "react-router-dom";
import { BookOpen, Mail, Heart } from "lucide-react";
import Logo from "../assets/Logo.png";

function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2">
              <img
                src={Logo}
                alt="NoteHub Logo"
                className="h-9 w-auto object-contain"
              />
            </Link>

            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-500">
              An open, peer-moderated repository for students and educators to discover, share, and preserve quality learning materials.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Quick Navigation
            </h3>

            <div className="mt-4 flex flex-col gap-2.5 text-sm">
              <Link
                to="/"
                className="text-slate-500 transition-colors hover:text-indigo-600"
              >
                Home Overview
              </Link>

              <Link
                to="/notes"
                className="text-slate-500 transition-colors hover:text-indigo-600"
              >
                Browse Study Notes
              </Link>

              <Link
                to="/categories"
                className="text-slate-500 transition-colors hover:text-indigo-600"
              >
                Academic Categories
              </Link>

              <Link
                to="/notes/upload"
                className="text-slate-500 transition-colors hover:text-indigo-600"
              >
                Share New Material
              </Link>
            </div>
          </div>

          {/* Community & Support */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Community & Help
            </h3>

            <p className="mt-4 text-sm leading-relaxed text-slate-500">
              Created to support open educational collaboration among university and college students worldwide.
            </p>

            <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-600 border border-slate-200">
              <Mail size={15} className="text-indigo-600" />
              <span>support@notehub.edu</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between text-xs text-slate-400">
          <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>

          <p className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart size={13} className="text-rose-500 fill-rose-500" />
            <span>for curious minds</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;