import { createContext, useContext, useState } from "react";
import api from "../services/api";

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError(null);

      //Api config
      //GetAllNotes
      const response = await api.get("/api/notes");
      console.log(response.data);
      setNotes(response.data.notes);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch notes");
    } finally {
      setLoading(false);
    }
  };

  //Upload Notes
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

  //GetSingle Note
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

  return (
    <NoteContext.Provider
      value={{
        notes,
        loading,
        error,
        fetchNotes,
        uploadNote,
        getSingleNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export const useNotes = () => {
  return useContext(NoteContext);
};
