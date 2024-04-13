import UserProfileForm from "@/form/UserProfileForm";
import {
  useGetCurrentUser,
  useUpdateMyUser,
} from "@/graphql/queries/currentUser";
import {Loader2} from "lucide-react";

export default function UserProfilePage() {
  const {currentUserData, isLoading: isGetUserLoading} = useGetCurrentUser();
  const {updateUser, isLoading: isUpdateLoading} = useUpdateMyUser();
  if (isGetUserLoading) {
    return (
      <Loader2 size={45} className="text-orange-500 animate-spin mx-auto" />
    );
  }

  if (!currentUserData) {
    return <span>Unable to load user profile</span>;
  }

  return (
    <div>
      <UserProfileForm
        currentUser={currentUserData}
        onSave={updateUser}
        isLoading={isUpdateLoading}
      />
    </div>
  );
}
