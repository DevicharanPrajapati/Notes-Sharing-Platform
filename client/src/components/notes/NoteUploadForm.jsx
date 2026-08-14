import { useState } from "react";
import {
  FileText,
  Image as ImageIcon,
  Upload,
  X,
  Send,
} from "lucide-react";
import { useNotes } from "../../context/NoteContext";

const NoteUploadForm = () => {
  const { uploadNote, loading, error } = useNotes();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
  });

  const [file, setFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [success, setSuccess] = useState("");

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

    if (!formData.title.trim()) {
      return;
    }

    if (!formData.description.trim()) {
      return;
    }

    if (!formData.subject.trim()) {
      return;
    }

    if (!file) {
      return;
    }

    const data = new FormData();

    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("subject", formData.subject);
    data.append("file", file);

    if (thumbnail) {
      data.append("thumbnail", thumbnail);
    }

    try {
      await uploadNote(data);

      setSuccess("Note uploaded successfully!");

      setFormData({
        title: "",
        description: "",
        subject: "",
      });

      setFile(null);
      setThumbnail(null);
      setThumbnailPreview("");
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
    >
      {/* Header */}
      <div className="mb-8">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <Upload size={24} />
        </div>

        <h2 className="text-2xl font-bold text-gray-900">
          Upload Your Note
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Share your study material with other students.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm font-medium text-red-600">{error}</p>
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
      <div className="mb-5">
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

      {/* Note File */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Note File
        </label>

        {!file ? (
          <label
            htmlFor="file"
            className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-8 text-center transition hover:border-indigo-400 hover:bg-indigo-50"
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-indigo-500 shadow-sm">
              <FileText size={24} />
            </div>

            <p className="text-sm font-semibold text-gray-700">
              Click to upload your note
            </p>

            <p className="mt-1 text-xs text-gray-500">
              PDF or supported document file
            </p>

            <input
              id="file"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        ) : (
          <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                <FileText size={20} />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-gray-800">
                  {file.name}
                </p>

                <p className="text-xs text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={removeFile}
              className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-500"
            >
              <X size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Thumbnail */}
      <div className="mb-8">
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Thumbnail
          <span className="ml-2 font-normal text-gray-400">(Optional)</span>
        </label>

        {!thumbnail ? (
          <label
            htmlFor="thumbnail"
            className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-8 text-center transition hover:border-indigo-400 hover:bg-indigo-50"
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-indigo-500 shadow-sm">
              <ImageIcon size={24} />
            </div>

            <p className="text-sm font-semibold text-gray-700">
              Upload thumbnail
            </p>

            <p className="mt-1 text-xs text-gray-500">
              JPG, PNG or WebP
            </p>

            <input
              id="thumbnail"
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="hidden"
            />
          </label>
        ) : (
          <div className="overflow-hidden rounded-xl border border-gray-200">
            <div className="relative h-48 bg-gray-100">
              <img
                src={thumbnailPreview}
                alt="Thumbnail preview"
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
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Uploading...
          </>
        ) : (
          <>
            <Send size={18} />
            Upload Note
          </>
        )}
      </button>
    </form>
  );
};

export default NoteUploadForm;