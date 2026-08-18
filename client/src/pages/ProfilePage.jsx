import { useAuth } from "../context/AuthContext";

import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileQuickActions from "../components/profile/ProfileQuickActions";
import AccountInfo from "../components/profile/AccountInfo";
import ProfileActions from "../components/profile/ProfileActions";

function Profile() {
  const { user, logout } = useAuth();

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

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <ProfileHeader user={user} />

        <ProfileQuickActions />

        <AccountInfo user={user} />
        <ProfileActions onLogout={handleLogout} />
      </div>
    </div>
  );
}

export default Profile;
