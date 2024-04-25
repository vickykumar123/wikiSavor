import {useAuth0} from "@auth0/auth0-react";
import {Button} from "../ui/button";
import UsernameMenu from "../UsernameMenu";
import {Loader2} from "lucide-react";
import {memo} from "react";

const DesktopNav = () => {
  const {isAuthenticated, isLoading, loginWithPopup} = useAuth0();
  if (isLoading) return <Loader2 className="animate-spin text-orange-500" />;
  return (
    <div>
      <span className="flex space-x-2 items-center authenticated">
        {isAuthenticated && <UsernameMenu />}
      </span>
      {!isAuthenticated && (
        <Button
          variant="ghost"
          className="bg-orange-500 text-white"
          onClick={async () => await loginWithPopup()}
        >
          Log In
        </Button>
      )}
    </div>
  );
};
export default memo(DesktopNav);
