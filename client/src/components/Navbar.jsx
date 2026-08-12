import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "../assets/Logo.png";

import {
  Home,
  FileText,
  Folder,
  Upload,
  User,
  ChevronDown,
  Menu,
  X,
  Bookmark,
  LogIn,
  LogOut,
} from "lucide-react";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  // console.log("Navbar user:", user);

  // const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();

      // setProfileOpen(false);
      setMobileOpen(false);

      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={Logo}
              alt="NoteHub Logo"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-5 md:flex">
            {/* Home */}
            <Link
              to="/"
              className="flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-indigo-600"
            >
              <Home size={18} />
              <span>Home</span>
            </Link>

            {/* Notes */}
            <Link
              to="/notes"
              className="flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-indigo-600"
            >
              <FileText size={18} />
              <span>Notes</span>
            </Link>

            {/* Categories */}
            <Link
              to="/categories"
              className="flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-indigo-600"
            >
              <Folder size={18} />
              <span>Categories</span>
            </Link>

            {/* Upload Note */}
            <Link
              to="/notes/upload"
              className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              <Upload size={18} />
              <span>Upload Note</span>
            </Link>

            {/* Profile */}
            {user ? (
              <Link
                to="/profile"
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-gray-700 transition hover:bg-gray-100"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
                  {user.name?.charAt(0).toUpperCase()}
                </div>

                <span className="max-w-24 truncate text-sm font-medium">
                  {user.name}
                </span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100 hover:text-indigo-600"
                title="Login"
              >
                <User size={21} />
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="border-t border-gray-100 py-4 md:hidden">
            <div className="flex flex-col gap-1">
              {/* Home */}
              <Link
                to="/"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <Home size={18} />
                <span>Home</span>
              </Link>

              {/* Notes */}
              <Link
                to="/notes"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <FileText size={18} />
                <span>Notes</span>
              </Link>

              {/* Categories */}
              <Link
                to="/categories"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <Folder size={18} />
                <span>Categories</span>
              </Link>

              {/* Upload */}
              <Link
                to="/notes/upload"
                onClick={closeMobileMenu}
                className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                <Upload size={18} />
                <span>Upload Note</span>
              </Link>

              {user && (
                <>
                  <div className="my-3 border-t border-gray-200" />

                  {/* User Info */}
                  <div className="flex items-center gap-3 px-3 py-2">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-gray-900">
                        {user.name}
                      </p>

                      <p className="truncate text-xs text-gray-500">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  {/* Profile */}
                  <Link
                    to="/profile"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <User size={18} />
                    <span>My Profile</span>
                  </Link>

                  {/* My Notes */}
                  <Link
                    to="/my-notes"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <FileText size={18} />
                    <span>My Notes</span>
                  </Link>

                  {/* Saved Notes */}
                  <Link
                    to="/saved-notes"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Bookmark size={18} />
                    <span>Saved Notes</span>
                  </Link>

                  {/* Logout */}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
