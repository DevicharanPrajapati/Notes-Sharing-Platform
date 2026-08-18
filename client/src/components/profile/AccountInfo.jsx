import { Calendar, Mail, User } from "lucide-react";

const AccountInfo = ({ user }) => {
  return (
    <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-lg font-semibold text-gray-900">
        Account Information
      </h2>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {/* Name */}
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
          <div className="flex items-center gap-3">
            <User
              size={18}
              className="text-indigo-600"
            />

            <div>
              <p className="text-xs text-gray-500">
                Name
              </p>

              <p className="mt-1 text-sm font-medium text-gray-900">
                {user?.name}
              </p>
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
          <div className="flex items-center gap-3">
            <Mail
              size={18}
              className="text-indigo-600"
            />

            <div className="min-w-0">
              <p className="text-xs text-gray-500">
                Email
              </p>

              <p className="mt-1 truncate text-sm font-medium text-gray-900">
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Member Since */}
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
          <div className="flex items-center gap-3">
            <Calendar
              size={18}
              className="text-indigo-600"
            />

            <div>
              <p className="text-xs text-gray-500">
                Member Since
              </p>

              <p className="mt-1 text-sm font-medium text-gray-900">
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
  );
};

export default AccountInfo;