import { useEffect, useState } from "react";
import { ArrowLeft, FileText, Image as ImageIcon, Save, X } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useNotes } from "../context/NoteContext";
import { useCategories } from "../context/CategoryContext";

const EditNotePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getMyNoteForEdit, updateNote, loading, error } = useNotes();

  const {
    categories,
    loading: categoriesLoading,
    fetchCategories,
  } = useCategories();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
    category: "",
  });

  const [note, setNote] = useState(null);
  const [loadingNote, setLoadingNote] = useState(true);

  const [file, setFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const [thumbnailPreview, setThumbnailPreview] = useState("");

  const [success, setSuccess] = useState("");
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const loadNote = async () => {
      try {
        setLoadingNote(true);

        const data = await getMyNoteForEdit(id);
        setNote(data);

        setFormData({
          title: data.title || "",
          description: data.description || "",
          subject: data.subject || "",
          category: data.category?._id || data.category || "",
        });
      } catch (error) {
        console.error("Failed to load note:", error);
      } finally {
        setLoadingNote(false);
      }
    };

    loadNote();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    setFile(selectedFile);
  };

  const handleThumbnailChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    setThumbnail(selectedFile);

    const previewUrl = URL.createObjectURL(selectedFile);
    setThumbnailPreview(previewUrl);
  };

  const removeFile = () => {
    setFile(null);
  };

  const removeThumbnail = () => {
    setThumbnail(null);
    setThumbnailPreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");
    setSubmitError("");

    if (!formData.title.trim()) {
      setSubmitError("Please enter a title.");
      return;
    }

    if (!formData.description.trim()) {
      setSubmitError("Please enter a description.");
      return;
    }

    if (!formData.subject.trim()) {
      setSubmitError("Please enter a subject.");
      return;
    }

    if (!formData.category) {
      setSubmitError("Please select a category.");
      return;
    }

    const data = new FormData();

    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("subject", formData.subject);
    data.append("category", formData.category);

    if (file) {
      data.append("file", file);
    }

    if (thumbnail) {
      data.append("thumbnail", thumbnail);
    }

    try {
      await updateNote(id, data);

      setSuccess("Note updated successfully!");

      setTimeout(() => {
        navigate("/my-notes");
      }, 800);
    } catch (error) {
      console.error("Update failed:", error);

      setSubmitError(error.response?.data?.message || "Failed to update note");
    }
  };

  if (loadingNote) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex items-center gap-3 text-gray-500">
          <span className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
          Loading note...
        </div>
      </main>
    );
  }

  if (!note) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <FileText className="mx-auto text-gray-400" size={48} />

          <h1 className="mt-4 text-xl font-bold text-gray-900">
            Note not found
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {error || "The note you're trying to edit doesn't exist."}
          </p>

          <Link
            to="/my-notes"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            <ArrowLeft size={17} />
            Back to My Notes
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {/* Back */}
        <Link
          to="/my-notes"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-indigo-600"
        >
          <ArrowLeft size={17} />
          Back to My Notes
        </Link>

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-indigo-600">My Notes</p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
            Edit Note
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Update your note information or replace the uploaded files.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
        >
          {/* Error */}
          {(submitError || error) && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm font-medium text-red-600">
                {submitError || error}
              </p>
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
              <p className="text-sm font-medium text-green-600">{success}</p>
            </div>
          )}

          {/* Title */}
          <div className="mb-5">
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Note Title
            </label>

            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Data Structures Notes"
              className="h-12 w-full rounded-xl border border-gray-200 px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          {/* Category */}
          <div className="mb-5">
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Category
            </label>

            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              disabled={categoriesLoading}
              className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-gray-50"
            >
              <option value="">
                {categoriesLoading
                  ? "Loading categories..."
                  : "Select a category"}
              </option>

              {categories
                .filter((category) => category.isActive)
                .map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Subject */}
          <div className="mb-5">
            <label
              htmlFor="subject"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Subject
            </label>

            <input
              id="subject"
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="e.g. Data Structures"
              className="h-12 w-full rounded-xl border border-gray-200 px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              placeholder="Write a short description about your notes..."
              className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          {/* Current File */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Note File
            </label>

            <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                  <FileText size={20} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Current file</p>

                  <p className="truncate text-sm font-semibold text-gray-800">
                    {file ? file.name : "Existing note file"}
                  </p>
                </div>
              </div>
            </div>

            {/* Replace File */}
            <label
              htmlFor="file"
              className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 bg-white px-4 py-4 text-sm font-semibold text-gray-600 transition hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-600"
            >
              <FileText size={18} />
              {file ? "Choose another file" : "Replace note file"}

              <input
                id="file"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {file && (
              <button
                type="button"
                onClick={removeFile}
                className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-red-500 hover:text-red-600"
              >
                <X size={15} />
                Remove selected file
              </button>
            )}
          </div>

          {/* Thumbnail */}
          <div className="mb-8">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Thumbnail
            </label>

            {/* New thumbnail preview */}
            {thumbnail ? (
              <div className="overflow-hidden rounded-xl border border-gray-200">
                <div className="relative h-48 bg-gray-100">
                  <img
                    src={thumbnailPreview}
                    alt="New thumbnail preview"
                    className="h-full w-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={removeThumbnail}
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-sm transition hover:bg-red-50 hover:text-red-500"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="px-4 py-3">
                  <p className="truncate text-sm font-medium text-gray-700">
                    {thumbnail.name}
                  </p>
                </div>
              </div>
            ) : note.thumbnail ? (
              <div className="overflow-hidden rounded-xl border border-gray-200">
                <div className="relative h-48 bg-gray-100">
                  <img
                    src={note.thumbnail}
                    alt={note.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="px-4 py-3">
                  <p className="text-xs text-gray-500">Current thumbnail</p>
                </div>
              </div>
            ) : (
              <div className="flex h-40 items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50">
                <div className="text-center">
                  <ImageIcon size={28} className="mx-auto text-gray-400" />

                  <p className="mt-2 text-sm text-gray-500">
                    No thumbnail uploaded
                  </p>
                </div>
              </div>
            )}

            {/* Replace Thumbnail */}
            <label
              htmlFor="thumbnail"
              className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 bg-white px-4 py-4 text-sm font-semibold text-gray-600 transition hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-600"
            >
              <ImageIcon size={18} />
              Replace thumbnail
              <input
                id="thumbnail"
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/my-notes"
              className="inline-flex h-12 flex-1 items-center justify-center rounded-xl border border-gray-200 bg-white px-5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading || categoriesLoading}
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Updating...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditNotePage;
