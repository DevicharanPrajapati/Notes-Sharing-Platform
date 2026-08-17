import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import { useAdmin } from "../../context/AdminContext";

import CategoryTable from "../../components/admin/categories/CategoryTable";
import CategoryModal from "../../components/admin/categories/CategoryModal";

const AdminCategoriesPage = () => {
  const {
    categories,
    loading,
    error,
    fetchCategories,
    addCategory,
    updateCategory,
    deleteCategory,
  } = useAdmin();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleToggleStatus = async (category) => {
    try {
      await updateCategory(category._id, {
        name: category.name,
        slug: category.slug,
        description: category.description,
        image: category.image,
        isActive: !category.isActive,
      });
    } catch (error) {
      console.error("Failed to update category status:", error);
    }
  };

  const handleAdd = () => {
    setEditingCategory(null);
    setModalOpen(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setEditingCategory(null);
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingCategory) {
        await updateCategory(editingCategory._id, formData);
      } else {
        await addCategory(formData);
      }

      handleClose();
    } catch (error) {
      console.error("Category operation failed:", error);
    }
  };

  const handleDelete = async (category) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${category.name}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteCategory(category._id);
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage categories used for notes.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && categories.length === 0 ? (
        <div className="flex min-h-[250px] items-center justify-center">
          <div className="flex items-center gap-3 text-gray-500">
            <span className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
            Loading categories...
          </div>
        </div>
      ) : (
        <CategoryTable
          categories={categories}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
        />
      )}

      {/* Create / Edit Modal */}
      <CategoryModal
        isOpen={modalOpen}
        title={editingCategory ? "Edit Category" : "Add Category"}
        initialData={editingCategory}
        onSubmit={handleSubmit}
        onCancel={handleClose}
        loading={loading}
      />
    </div>
  );
};

export default AdminCategoriesPage;
