import { Calendar, Mail, Shield, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const AdminProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Admin Profile
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          View your administrator account information.
        </p>
      </div>

      {/* Profile Card */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Profile Header */}
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-8 sm:px-8">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-indigo-50 text-indigo-600">
              {user?.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={user.name || "Admin"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <User size={38} />
              )}
            </div>

            <div className="text-center sm:text-left">
              <h2 className="text-xl font-bold text-gray-900">
                {user?.name || "Admin"}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {user?.email || "No email"}
              </p>

              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-600">
                <Shield size={13} />
                Administrator
              </span>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="p-6 sm:p-8">
          <h3 className="mb-6 text-lg font-semibold text-gray-900">
            Account Information
          </h3>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* Name */}
            <div className="rounded-xl border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <User size={18} />
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-500">
                    Full Name
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    {user?.name || "Not available"}
                  </p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="rounded-xl border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <Mail size={18} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium text-gray-500">
                    Email
                  </p>

                  <p className="mt-1 truncate text-sm font-semibold text-gray-900">
                    {user?.email || "Not available"}
                  </p>
                </div>
              </div>
            </div>

            {/* Role */}
            <div className="rounded-xl border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <Shield size={18} />
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-500">
                    Role
                  </p>

                  <p className="mt-1 text-sm font-semibold capitalize text-gray-900">
                    {user?.role || "Admin"}
                  </p>
                </div>
              </div>
            </div>

            {/* Created At */}
            <div className="rounded-xl border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <Calendar size={18} />
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-500">
                    Account Created
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    {user?.createdAt
                      ? new Date(
                          user.createdAt,
                        ).toLocaleDateString()
                      : "Not available"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfilePage;