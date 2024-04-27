import {useAuth0} from "@auth0/auth0-react";
import {Button} from "../ui/button";
import LoadingButton from "../custom_button/LoadingButton";
import {Dialog, DialogContent, DialogTrigger} from "../ui/dialog";
import UserProfileForm, {UserFormData} from "@/form/UserProfileForm";
import {useGetCurrentUser} from "@/graphql/queries/currentUser";

interface CheckoutButtonProps {
  onCheckout: (userFormData: UserFormData) => void;
  disabled: boolean;
  isLoading: boolean;
}

export default function CheckoutButton({
  onCheckout,
  disabled,
  isLoading,
}: CheckoutButtonProps) {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithPopup,
  } = useAuth0();
  const {currentUserData, isLoading: isGetUserLoading} = useGetCurrentUser();
  const onLogin = async () => {
    await loginWithPopup();
  };

  if (!isAuthenticated) {
    return (
      <Button variant="submit" className="w-full" onClick={onLogin}>
        Login to check out
      </Button>
    );
  }
  if (isAuthLoading || !currentUserData || isLoading) {
    return <LoadingButton />;
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="submit" className="w-full" disabled={disabled}>
          Checkout your order
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50 rounded-lg">
        <UserProfileForm
          currentUser={currentUserData}
          onSave={onCheckout}
          isLoading={isGetUserLoading}
          isCheckout={true}
        />
      </DialogContent>
    </Dialog>
  );
}
