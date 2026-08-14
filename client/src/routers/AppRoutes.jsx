import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/HomePage";
import Login from "../pages/LoginPage";
import Register from "../pages/RegisterPage";
import Profile from "../pages/ProfilePage";

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
          {/* <Route path="/notes" element={<Notes />} />
          <Route path="/categories" element={<Categories />} /> */}
        </Route>

        {/* Protected Pages */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            {/* <Route path="/notes/upload" element={<UploadNote />} /> */}
            <Route path="/profile" element={<Profile />} />
            {/* <Route path="/my-notes" element={<MyNotes />} /> */}
            {/* <Route path="/saved-notes" element={<SavedNotes />} /> */}
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;