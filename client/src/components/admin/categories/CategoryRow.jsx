import { CheckCircle, Folder, Pencil, Trash2, XCircle } from "lucide-react";

const CategoryRow = ({ category, onEdit, onDelete, onToggleStatus }) => {
  return (
    <tr className="hover:bg-gray-50">
      {/* Category */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-indigo-50 text-indigo-600">
            {category.image ? (
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <Folder size={19} />
            )}
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-900">
              {category.name}
            </p>

            <p className="text-xs text-gray-500">{category.slug}</p>
          </div>
        </div>
      </td>

      {/* Description */}
      <td className="max-w-sm px-6 py-4 text-sm text-gray-600">
        <p className="truncate">{category.description || "No description"}</p>
      </td>

      {/* Notes Count */}
      <td className="px-6 py-4 text-center">
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
          {category.notesCount || 0}
        </span>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <button
          type="button"
          onClick={() => onToggleStatus(category)}
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition ${
            category.isActive
              ? "bg-green-50 text-green-600 hover:bg-green-100"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          title={
            category.isActive ? "Deactivate category" : "Activate category"
          }
        >
          {category.isActive ? (
            <>
              <CheckCircle size={13} />
              Active
            </>
          ) : (
            <>
              <XCircle size={13} />
              Inactive
            </>
          )}
        </button>
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => onEdit(category)}
            className="rounded-lg p-2 text-indigo-600 transition hover:bg-indigo-50"
            title="Edit category"
          >
            <Pencil size={17} />
          </button>

          <button
            type="button"
            onClick={() => onDelete(category)}
            className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
            title="Delete category"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CategoryRow;
