import {
  Bookmark,
  FileText,
  Upload,
} from "lucide-react";
import { Link } from "react-router-dom";

const ProfileQuickActions = () => {
  const actions = [
    {
      title: "My Notes",
      description: "View uploaded notes",
      path: "/my-notes",
      icon: FileText,
    },
    {
      title: "Saved Notes",
      description: "View saved notes",
      path: "/saved-notes",
      icon: Bookmark,
    },
    {
      title: "Upload Note",
      description: "Share your notes",
      path: "/notes/upload",
      icon: Upload,
    },
  ];

  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
      {actions.map((action) => {
        const Icon = action.icon;

        return (
          <Link
            key={action.path}
            to={action.path}
            className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                <Icon size={22} />
              </div>

              <div>
                <p className="font-semibold text-gray-900">
                  {action.title}
                </p>

                <p className="text-sm text-gray-500">
                  {action.description}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProfileQuickActions;