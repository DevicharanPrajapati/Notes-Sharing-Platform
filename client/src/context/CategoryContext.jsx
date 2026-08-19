import { createContext, useContext, useState } from "react";
import api from "../services/api";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get("/api/categories");

      setCategories(response.data.categories);
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch categories";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoryBySlug = async (slug) => {
  try {
    setLoading(true);
    setError(null);

    const response = await api.get(
      `/api/categories/slug/${slug}`
    );

    return response.data.category;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      "Failed to fetch category";

    setError(message);
    throw error;
  } finally {
    setLoading(false);
  }
};

  return (
    <CategoryContext.Provider
      value={{
        categories,
        loading,
        error,
        fetchCategories,
        fetchCategoryBySlug,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => {
  return useContext(CategoryContext);
};