import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, FileText, Folder, User, LogOut, Shield } from "lucide-react";
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
      name: "Users Management",
      path: "/admin/users",
      icon: Users,
    },
    {
      name: "Notes Moderation",
      path: "/admin/notes",
      icon: FileText,
    },
    {
      name: "Categories",
      path: "/admin/categories",
      icon: Folder,
    },
    {
      name: "Admin Profile",
      path: "/admin/profile",
      icon: User,
    },
  ];

  return (
    <aside className="w-64 shrink-0 border-r border-slate-200/80 bg-white">
      <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-600 text-white shadow-sm shadow-purple-500/30">
          <Shield size={18} />
        </div>

        <div>
          <h2 className="text-sm font-bold text-slate-900">Admin Console</h2>
          <p className="text-xs text-slate-400">NoteHub Administration</p>
        </div>
      </div>

      <nav className="space-y-1.5 p-4">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`
              }
            >
              <Icon size={17} />
              <span>{link.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-slate-100 p-4">
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-50"
        >
          <LogOut size={17} />
          <span>Exit / Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
