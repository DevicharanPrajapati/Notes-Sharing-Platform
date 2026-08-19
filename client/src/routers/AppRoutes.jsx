import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/HomePage";
import Login from "../pages/LoginPage";
import Register from "../pages/RegisterPage";
import Profile from "../pages/ProfilePage";
import NotesPage from "../pages/NotesPage";
import UploadNotePage from "../pages/UploadNotePage";
import NoteDetailsPage from "../pages/NoteDetailsPage";
import NotePdfViewerPage from "../pages/NotePdfViewerPage";

import MainLayout from "../components/layout/MainLayout";
import AuthLayout from "../components/layout/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";
import EditNotePage from "../pages/EditNotePage";
import MyNotesPage from "../pages/MyNotesPage";

import AdminLayout from "../components/layout/AdminLayout";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AdminRoute from "./AdminRoute";
import AdminUsersPage from "../pages/admin/AdminUsersPage";
import AdminNotesPage from "../pages/admin/AdminNotesPage";
import AdminCategoriesPage from "../pages/admin/AdminCategoriesPage";
import AdminProfilePage from "../pages/admin/AdminProfilePage";
import CategoryPage from "../pages/CategoryPage";
import CategoryNotesPage from "../pages/CategoryNotesPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public/Auth Pages */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Public Main Pages */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* Protected Pages */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/categories" element={<CategoryPage />} />
            <Route path="/category/:slug" element={<CategoryNotesPage />} />

            <Route path="/notes/upload" element={<UploadNotePage />} />
            <Route path="/notes/:id" element={<NoteDetailsPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-notes/edit/:id" element={<EditNotePage />} />
            <Route path="/my-notes" element={<MyNotesPage />} />

            <Route path="/notes/:id/view" element={<NotePdfViewerPage />} />
          </Route>
        </Route>

        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route
              path="/admin"
              element={<Navigate to="/admin/dashboard" replace />}
            />
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin/notes" element={<AdminNotesPage />} />
            <Route path="/admin/categories" element={<AdminCategoriesPage />} />
            t
            <Route path="/admin/profile" element={<AdminProfilePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
