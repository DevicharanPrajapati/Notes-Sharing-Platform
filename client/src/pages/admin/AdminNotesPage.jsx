import { useEffect, useState } from "react";
import {
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Trash2,
  FileText,
} from "lucide-react";
import { useAdmin } from "../../context/AdminContext";

const AdminNotesPage = () => {
  const {
    notes,
    categories,
    loading,
    error,
    fetchNotes,
    fetchCategories,
    approveNote,
    rejectNote,
    deleteNote,
  } = useAdmin();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchNotes({
      search,
      status,
      category,
      page,
      limit: 10,
    });
  }, [search, status, category, page]);

  const noteList = notes?.notes || [];
  const pagination = notes?.pagination || {
    page: 1,
    limit: 10,
    totalNotes: 0,
    totalPages: 1,
  };

  const getStatusStyle = (noteStatus) => {
    if (noteStatus === "approved") {
      return "bg-green-50 text-green-600";
    }

    if (noteStatus === "rejected") {
      return "bg-red-50 text-red-600";
    }

    return "bg-yellow-50 text-yellow-600";
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Notes</h1>

        <p className="mt-1 text-sm text-gray-500">
          Review and manage notes uploaded by users.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="grid gap-4 md:grid-cols-3">
          {/* Search */}
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search notes..."
              className="w-full rounded-xl border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Status */}
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>

          {/* Category */}
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="">All Categories</option>

            {categories.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex min-h-[200px] items-center justify-center">
          <div className="flex items-center gap-3 text-gray-500">
            <span className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
            Loading notes...
          </div>
        </div>
      )}

      {/* Notes Table */}
      {!loading && (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Note
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Category
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Uploaded By
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Downloads
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {noteList.length > 0 ? (
                  noteList.map((note) => {
                    const noteStatus = note.moderation?.status || "pending";

                    return (
                      <tr key={note._id} className="hover:bg-gray-50">
                        {/* Note */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                              <FileText size={19} />
                            </div>

                            <div>
                              <p className="max-w-xs truncate text-sm font-semibold text-gray-900">
                                {note.title}
                              </p>

                              <p className="text-xs text-gray-500">
                                {note.subject}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {note.category?.name || "No category"}
                        </td>

                        {/* Uploaded By */}
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-gray-900">
                            {note.uploadedBy?.name || "Unknown"}
                          </p>

                          <p className="text-xs text-gray-500">
                            {note.uploadedBy?.email || ""}
                          </p>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusStyle(
                              noteStatus,
                            )}`}
                          >
                            {noteStatus}
                          </span>
                        </td>

                        {/* Downloads */}
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {note.downloads || 0}
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => window.open(note.file, "_blank")}
                              className="rounded-lg p-2 text-indigo-600 hover:bg-indigo-50"
                              title="View PDF"
                            >
                              <Eye size={17} />
                            </button>

                            {noteStatus === "pending" && (
                              <>
                                <button
                                  type="button"
                                  onClick={() => approveNote(note._id)}
                                  disabled={loading}
                                  className="rounded-lg p-2 text-green-600 hover:bg-green-50 disabled:opacity-50"
                                  title="Approve note"
                                >
                                  <CheckCircle size={17} />
                                </button>

                                <button
                                  type="button"
                                  onClick={async () => {
                                    const reason = window.prompt(
                                      "Enter rejection reason:",
                                    );

                                    if (!reason) return;

                                    await rejectNote(note._id, reason);
                                  }}
                                  disabled={loading}
                                  className="rounded-lg p-2 text-orange-600 hover:bg-orange-50 disabled:opacity-50"
                                  title="Reject note"
                                >
                                  <XCircle size={17} />
                                </button>
                              </>
                            )}

                            <button
                              type="button"
                              onClick={async () => {
                                const confirmed = window.confirm(
                                  `Are you sure you want to delete "${note.title}"?`,
                                );

                                if (!confirmed) return;

                                await deleteNote(note._id);
                              }}
                              disabled={loading}
                              className="rounded-lg p-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
                              title="Delete note"
                            >
                              <Trash2 size={17} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-12 text-center text-sm text-gray-500"
                    >
                      No notes found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
              <p className="text-sm text-gray-500">
                Page {pagination.page} of {pagination.totalPages}
              </p>

              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((prev) => prev - 1)}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>

                <button
                  type="button"
                  disabled={page >= pagination.totalPages}
                  onClick={() => setPage((prev) => prev + 1)}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminNotesPage;
