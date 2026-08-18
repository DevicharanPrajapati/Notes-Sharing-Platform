import { useAuth } from "../context/AuthContext";

import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileQuickActions from "../components/profile/ProfileQuickActions";
import AccountInfo from "../components/profile/AccountInfo";

function Profile() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <ProfileHeader user={user} />

        <ProfileQuickActions />

        <AccountInfo user={user} />
      </div>
    </div>
  );
}

export default Profile;