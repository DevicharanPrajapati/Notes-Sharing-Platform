import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";

const SavedNoteContext = createContext();

export const SavedNoteProvider = ({ children }) => {
  const { user } = useAuth();

  const [savedNotes, setSavedNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const saveNote = async (noteId) => {
    try {
      const response = await api.post("/api/saved-note", {
        noteId,
      });

      setSavedNotes((prev) => [...prev, response.data.savedNote]);

      return response.data;
    } catch (error) {
      console.error("Save note failed:", error);
      throw error;
    }
  };
  const unsaveNote = async (noteId) => {
    try {
      const response = await api.delete(`/api/saved-note/${noteId}`);

      setSavedNotes((prev) =>
        prev.filter(
          (savedNote) => (savedNote.noteId?._id || savedNote.noteId) !== noteId,
        ),
      );

      return response.data;
    } catch (error) {
      console.error("Unsave note failed:", error);
      throw error;
    }
  };

  const fetchSavedNotes = async () => {
    try {
      setLoading(true);

      const response = await api.get("/api/saved-note");

      setSavedNotes(response.data.savedNotes || []);
    } catch (error) {
      console.error("Fetch saved notes failed:", error);
      setSavedNotes([]);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchSavedNotes();
    } else {
      setSavedNotes([]);
    }
  }, [user]);

  const value = {
    savedNotes,
    loading,
    saveNote,
    unsaveNote,
    fetchSavedNotes,
  };

  return (
    <SavedNoteContext.Provider value={value}>
      {children}
    </SavedNoteContext.Provider>
  );
};

export const useSavedNotes = () => {
  return useContext(SavedNoteContext);
};
