import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AuthLayout;