import UserProfileForm from "@/form/UserProfileForm";
import {useUpdateMyUser} from "@/graphql/queries/currentUser";

export default function UserProfilePage() {
  const {updateUser, isLoading} = useUpdateMyUser();
  return (
    <div>
      <UserProfileForm onSave={updateUser} isLoading={isLoading} />
    </div>
  );
}
