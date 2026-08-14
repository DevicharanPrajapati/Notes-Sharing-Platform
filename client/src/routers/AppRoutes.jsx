import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/HomePage";
import Login from "../pages/LoginPage";
import Register from "../pages/RegisterPage";
import Profile from "../pages/ProfilePage";
import NotesPage from "../pages/NotesPage";
import UploadNotePage from "../pages/UploadNotePage";
import NoteDetailsPage from "../pages/NoteDetailsPage";

import MainLayout from "../components/layout/MainLayout";
import AuthLayout from "../components/layout/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";

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
            <Route path="/notes/upload" element={<UploadNotePage />} />
            <Route path="/notes/:id" element={<NoteDetailsPage />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;