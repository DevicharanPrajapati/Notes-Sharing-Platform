import { Menu, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const AdminHeader = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6">
      {/* Mobile menu */}
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
        aria-label="Open admin menu"
      >
        <Menu size={22} />
      </button>

      {/* Desktop title */}
      <div className="hidden lg:block">
        <h1 className="text-lg font-semibold text-gray-900">
          Admin Panel
        </h1>
      </div>

      {/* Admin profile */}
      <div className="ml-auto flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold text-gray-900">
            {user?.name || "Admin"}
          </p>

          <p className="text-xs text-gray-500">
            {user?.email || ""}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-indigo-50 text-indigo-600">
          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt={user.name || "Admin"}
              className="h-full w-full object-cover"
            />
          ) : (
            <User size={19} />
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;