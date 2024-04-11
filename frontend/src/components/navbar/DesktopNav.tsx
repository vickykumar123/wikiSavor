import {useAuth0} from "@auth0/auth0-react";
import {Button} from "../ui/button";
import UsernameMenu from "../UsernameMenu";

export default function DesktopNav() {
  const {loginWithRedirect, isAuthenticated} = useAuth0();
  return (
    <div>
      <span className="flex space-x-2 items-center">
        {isAuthenticated && <UsernameMenu />}
      </span>
      {!isAuthenticated && (
        <Button
          variant="ghost"
          className="bg-orange-500 text-white"
          onClick={async () => await loginWithRedirect()}
        >
          Log In
        </Button>
      )}
    </div>
  );
}
