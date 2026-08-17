import { Link } from "react-router-dom";
import { BookOpen, Mail } from "lucide-react";

function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-lg font-bold text-gray-900"
            >
              <BookOpen className="text-indigo-600" size={22} />
              NoteSharing
            </Link>

            <p className="mt-3 max-w-sm text-sm leading-6 text-gray-500">
              A platform for students to share, discover, and access
              useful study notes and learning resources.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Quick Links
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm">
              <Link
                to="/"
                className="text-gray-500 transition hover:text-indigo-600"
              >
                Home
              </Link>

              <Link
                to="/notes"
                className="text-gray-500 transition hover:text-indigo-600"
              >
                Browse Notes
              </Link>

              <Link
                to="/notes/upload"
                className="text-gray-500 transition hover:text-indigo-600"
              >
                Upload Notes
              </Link>

              <Link
                to="/profile"
                className="text-gray-500 transition hover:text-indigo-600"
              >
                Profile
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              NoteSharing
            </h3>

            <p className="mt-4 text-sm leading-6 text-gray-500">
              Have questions or feedback? We'd love to hear from you.
            </p>

            <div className="mt-4 inline-flex items-center gap-2 text-sm text-gray-500">
              <Mail size={17} className="text-indigo-600" />
              <span>Contact Support</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} NoteSharing. All rights reserved.
          </p>

          <p className="text-sm text-gray-400">
            Built for students & learners.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;