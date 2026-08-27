import {
  Users,
  FileText,
  Folder,
  Download,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

import { useEffect } from "react";
import { useAdmin } from "../../context/AdminContext";
const AdminDashboardPage = () => {
  const { dashboard, loading, error, fetchDashboard } = useAdmin();

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex items-center gap-3 text-gray-500">
          <span className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
          Loading dashboard...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-600">
        {error}
      </div>
    );
  }

  const stats = dashboard?.stats || {};

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers || 0,
      icon: Users,
      iconBg: "bg-blue-50 text-blue-600",
    },
    {
      title: "Total Notes",
      value: stats.totalNotes || 0,
      icon: FileText,
      iconBg: "bg-indigo-50 text-indigo-600",
    },
    {
      title: "Categories",
      value: stats.totalCategories || 0,
      icon: Folder,
      iconBg: "bg-purple-50 text-purple-600",
    },
    {
      title: "Downloads",
      value: stats.totalDownloads || 0,
      icon: Download,
      iconBg: "bg-cyan-50 text-cyan-600",
    },
    {
      title: "Pending Notes",
      value: stats.pendingNotes || 0,
      icon: Clock,
      iconBg: "bg-amber-50 text-amber-600",
    },
    {
      title: "Approved Notes",
      value: stats.approvedNotes || 0,
      icon: CheckCircle,
      iconBg: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Rejected Notes",
      value: stats.rejectedNotes || 0,
      icon: XCircle,
      iconBg: "bg-rose-50 text-rose-600",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-2xl font-extrabold text-slate-900 sm:text-3xl">
          System Overview & Metrics
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Real-time metrics, user growth, and note moderation queue status.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {card.title}
                  </p>

                  <p className="mt-2 font-display text-2xl font-extrabold text-slate-900">
                    {card.value}
                  </p>
                </div>

                <div className={`rounded-xl p-3 shadow-inner ${card.iconBg}`}>
                  <Icon size={20} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Data */}
      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        {/* Recent Users */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="font-semibold text-gray-900">Recent Users</h2>
          </div>

          <div className="divide-y divide-gray-100">
            {dashboard?.recentUsers?.length ? (
              dashboard.recentUsers.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center justify-between px-6 py-4"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {user.name}
                    </p>

                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      user.role === "admin"
                        ? "bg-purple-50 text-purple-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {user.role}
                  </span>
                </div>
              ))
            ) : (
              <p className="px-6 py-8 text-center text-sm text-gray-500">
                No users found.
              </p>
            )}
          </div>
        </div>

        {/* Recent Notes */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="font-semibold text-gray-900">Recent Notes</h2>
          </div>

          <div className="divide-y divide-gray-100">
            {dashboard?.recentNotes?.length ? (
              dashboard.recentNotes.map((note) => (
                <div key={note._id} className="px-6 py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {note.title}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {note.subject}
                        {note.category?.name ? ` • ${note.category.name}` : ""}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        By {note.uploadedBy?.name || "Unknown"}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                      {note.downloads || 0} downloads
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="px-6 py-8 text-center text-sm text-gray-500">
                No notes found.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Pending Moderation */}
      <div className="mt-6 rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div>
            <h2 className="font-semibold text-gray-900">Pending Moderation</h2>

            <p className="mt-1 text-xs text-gray-500">
              Notes waiting for admin review.
            </p>
          </div>

          <span className="rounded-full bg-yellow-50 px-3 py-1 text-xs font-semibold text-yellow-600">
            {stats.pendingNotes || 0} pending
          </span>
        </div>

        <div className="divide-y divide-gray-100">
          {dashboard?.pendingNotes?.length ? (
            dashboard.pendingNotes.map((moderation) => (
              <div
                key={moderation._id}
                className="flex items-center justify-between gap-4 px-6 py-4"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {moderation.noteId?.title || "Untitled Note"}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    By {moderation.noteId?.uploadedBy?.name || "Unknown user"}
                  </p>
                </div>

                <span className="rounded-full bg-yellow-50 px-3 py-1 text-xs font-medium text-yellow-600">
                  Pending
                </span>
              </div>
            ))
          ) : (
            <p className="px-6 py-8 text-center text-sm text-gray-500">
              No pending notes.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
