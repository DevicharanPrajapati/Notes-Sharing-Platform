import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await api.get("/api/auth/me");

      setUser(response.data.data.user);
    } catch (error) {
      setUser(null);

      if (error.response?.status !== 401) {
        console.error("Auth check failed:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    const response = await api.post("/api/auth/register", userData);

    return response.data;
  };

  const login = async (credentials) => {
    const response = await api.post("/api/auth/login", credentials);

    console.log("LOGIN RESPONSE:", response.data);

    setUser(response.data.data.user);

    return response.data;
  };

  const logout = async () => {
    try {
      await api.post("/api/auth/logout");
    } finally {
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
