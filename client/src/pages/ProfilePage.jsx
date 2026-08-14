import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  FileText,
  Bookmark,
  Upload,
} from "lucide-react";

function Profile() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const firstLetter = user.name?.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Profile Header */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col items-center gap-5 sm:flex-row">

            {/* Avatar */}
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-3xl font-bold text-indigo-700">
              {firstLetter}
            </div>

            {/* User Information */}
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900">
                {user.name}
              </h1>

              <div className="mt-2 flex items-center justify-center gap-2 text-gray-500 sm:justify-start">
                <Mail size={16} />
                <span className="text-sm">
                  {user.email}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

          {/* My Notes */}
          <Link
            to="/my-notes"
            className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                <FileText size={22} />
              </div>

              <div>
                <p className="font-semibold text-gray-900">
                  My Notes
                </p>
                <p className="text-sm text-gray-500">
                  View uploaded notes
                </p>
              </div>
            </div>
          </Link>

          {/* Saved Notes */}
          <Link
            to="/saved-notes"
            className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                <Bookmark size={22} />
              </div>

              <div>
                <p className="font-semibold text-gray-900">
                  Saved Notes
                </p>
                <p className="text-sm text-gray-500">
                  View saved notes
                </p>
              </div>
            </div>
          </Link>

          {/* Upload */}
          <Link
            to="/notes/upload"
            className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                <Upload size={22} />
              </div>

              <div>
                <p className="font-semibold text-gray-900">
                  Upload Note
                </p>
                <p className="text-sm text-gray-500">
                  Share your notes
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Account Information */}
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-semibold text-gray-900">
            Account Information
          </h2>

          <div className="mt-5 space-y-4">

            <div className="flex items-center gap-3">
              <User size={18} className="text-gray-400" />

              <div>
                <p className="text-xs text-gray-500">
                  Name
                </p>

                <p className="text-sm font-medium text-gray-900">
                  {user.name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail size={18} className="text-gray-400" />

              <div>
                <p className="text-xs text-gray-500">
                  Email
                </p>

                <p className="text-sm font-medium text-gray-900">
                  {user.email}
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Profile;