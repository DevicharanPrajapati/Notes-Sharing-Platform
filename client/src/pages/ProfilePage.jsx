import { useState } from "react";
import { useAuth } from "../context/AuthContext";

import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileQuickActions from "../components/profile/ProfileQuickActions";
import AccountInfo from "../components/profile/AccountInfo";
import ProfileActions from "../components/profile/ProfileActions";
import ChangePassword from "../components/profile/ChangePassword";

function Profile() {
  const { user, logout } = useAuth();

  const [showChangePassword, setShowChangePassword] = useState(false);

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleChangePassword = () => {
    setShowChangePassword((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <ProfileHeader user={user} />

        <ProfileQuickActions />

        <AccountInfo user={user} />

        <ProfileActions
          onLogout={handleLogout}
          onChangePassword={handleChangePassword}
        />

        {showChangePassword && <ChangePassword />}
      </div>
    </div>
  );
}

export default Profile;