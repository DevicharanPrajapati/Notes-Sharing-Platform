import { createContext, useContext, useState } from "react";
import api from "../services/api";

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalNotes: 0,
    limit: 10,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get All Notes
  const fetchNotes = async ({
    category = "",
    subject = "",
    search = "",
    page = 1,
    limit = 10,
  } = {}) => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        page,
        limit,
      };

      if (category) {
        params.category = category;
      }

      if (subject) {
        params.subject = subject;
      }

      if (search) {
        params.search = search;
      }

      const response = await api.get("/api/notes", {
        params,
      });

      console.log(response.data);

      setNotes(response.data.notes || []);

      setPagination(
        response.data.pagination || {
          currentPage: page,
          totalPages: 1,
          totalNotes: response.data.notes?.length || 0,
          limit,
        },
      );
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch notes");
    } finally {
      setLoading(false);
    }
  };

  // Upload Note
  const uploadNote = async (formData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.post("/api/notes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);

      // Refresh notes after successful upload
      await fetchNotes();

      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to upload note";

      setError(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Get Single Note
  const getSingleNote = async (id) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get(`/api/notes/${id}`);

      return response.data.note;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to fetch note";

      setError(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Get Note View URL
  const getNoteViewUrl = (id) => {
    return `${api.defaults.baseURL}/api/notes/${id}/view`;
  };

  const getNoteDownloadUrl = (id) => {
    return `${api.defaults.baseURL}/api/notes/${id}/download`;
  };

  const fetchMyNotes = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get("/api/notes/my-notes");

      setNotes(response.data.notes || []);

      return response.data.notes || [];
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch your notes";

      setError(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateNote = async (id, formData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.put(`/api/notes/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to update note";

      setError(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (id) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.delete(`/api/notes/${id}`);

      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));

      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to delete note";

      setError(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        pagination,
        loading,
        error,
        fetchNotes,
        uploadNote,
        getSingleNote,
        getNoteViewUrl,
        getNoteDownloadUrl,
        fetchMyNotes,
        updateNote,
        deleteNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export const useNotes = () => {
  return useContext(NoteContext);
};
