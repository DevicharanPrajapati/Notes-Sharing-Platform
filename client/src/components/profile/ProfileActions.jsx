import { LogOut } from "lucide-react";

const ProfileActions = ({ onLogout }) => {
  return (
    <div className="mt-6 rounded-2xl border border-red-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-lg font-semibold text-gray-900">
        Account Actions
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        Manage your current session.
      </p>

      <button
        type="button"
        onClick={onLogout}
        className="mt-5 inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
};

export default ProfileActions;