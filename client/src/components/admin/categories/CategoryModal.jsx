import CategoryForm from "./CategoryForm";

const CategoryModal = ({
  isOpen,
  title,
  initialData = null,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-5">
          <h2 className="text-xl font-bold text-gray-900">
            {title}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {initialData
              ? "Update category details."
              : "Create a new category for notes."}
          </p>
        </div>

        {/* Form */}
        <div className="px-6 py-6">
          <CategoryForm
            initialData={initialData}
            onSubmit={onSubmit}
            onCancel={onCancel}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;