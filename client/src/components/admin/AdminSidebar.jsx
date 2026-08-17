import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, FileText, Folder } from "lucide-react";

import { LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const AdminSidebar = () => {
  const { logout } = useAuth();

  const links = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: Users,
    },
    {
      name: "Notes",
      path: "/admin/notes",
      icon: FileText,
    },
    {
      name: "Categories",
      path: "/admin/categories",
      icon: Folder,
    },
    {
      name: "Profile",
      path: "/admin/profile",
      icon: Users,
    },
  ];

  return (
    <aside className="w-64 border-r border-gray-200 bg-white">
      <div className="border-b border-gray-200 px-6 py-5">
        <h2 className="text-lg font-bold text-gray-900">Admin Panel</h2>

        <p className="mt-1 text-xs text-gray-500">NoteSharing</p>
      </div>

      <nav className="space-y-1 p-4">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              <Icon size={19} />
              {link.name}
            </NavLink>
          );
        })}
      </nav>
      <div className="border-t border-gray-200 p-4">
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          <LogOut size={19} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
