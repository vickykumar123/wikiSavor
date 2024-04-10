import {useAuth0} from "@auth0/auth0-react";
import {Button} from "../ui/button";

export default function DesktopNav() {
  const {loginWithRedirect} = useAuth0();
  return (
    <div>
      <Button
        variant="outline"
        className="bg-orange-500 text-white"
        onClick={async () => await loginWithRedirect()}
      >
        Log In
      </Button>
    </div>
  );
}
