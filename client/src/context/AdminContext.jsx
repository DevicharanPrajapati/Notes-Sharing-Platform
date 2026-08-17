import { createContext, useContext, useState } from "react";
import api from "../services/api";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [dashboard, setDashboard] = useState(null);
  const [users, setUsers] = useState([]);
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get("/api/admin/dashboard");

      setDashboard(response.data);
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch dashboard";

      setError(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get("/api/admin/users");

      setUsers(response.data.users);
    } catch (error) {
      const message = error.response?.data?.message || "Failed to fetch users";

      setError(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchNotes = async (params = {}) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get("/api/admin/notes", {
        params,
      });

      setNotes(response.data);

      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to fetch notes";

      setError(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get("/api/admin/categories");

      setCategories(response.data.categories);
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch categories";

      setError(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const banUser = async (userId) => {
    try {
      setLoading(true);
      setError(null);

      await api.patch(`/api/admin/users/${userId}/ban`);

      await fetchUsers();
    } catch (error) {
      const message = error.response?.data?.message || "Failed to ban user";

      setError(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const unbanUser = async (userId) => {
    try {
      setLoading(true);
      setError(null);

      await api.patch(`/api/admin/users/${userId}/unban`);

      await fetchUsers();
    } catch (error) {
      const message = error.response?.data?.message || "Failed to unban user";

      setError(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const changeUserRole = async (userId, role) => {
    try {
      setLoading(true);
      setError(null);

      await api.patch(`/api/admin/users/${userId}/role`, {
        role,
      });

      await fetchUsers();
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to change user role";

      setError(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    try {
      setLoading(true);
      setError(null);

      await api.delete(`/api/admin/users/${userId}`);

      await fetchUsers();
    } catch (error) {
      const message = error.response?.data?.message || "Failed to delete user";

      setError(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        dashboard,
        users,
        notes,
        categories,
        loading,
        error,
        fetchDashboard,
        fetchUsers,
        fetchNotes,
        fetchCategories,

        banUser,
        unbanUser,
        changeUserRole,
        deleteUser,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  return useContext(AdminContext);
};
