import { Mail, User } from "lucide-react";

const ProfileHeader = ({ user }) => {
  const firstLetter = user?.name?.charAt(0).toUpperCase();

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col items-center gap-5 sm:flex-row">
        {/* Avatar */}
        <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-indigo-100 text-3xl font-bold text-indigo-700">
          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt={user.name}
              className="h-full w-full object-cover"
            />
          ) : (
            firstLetter || <User size={32} />
          )}
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

          <span className="mt-3 inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold capitalize text-indigo-600">
            {user.role || "user"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;