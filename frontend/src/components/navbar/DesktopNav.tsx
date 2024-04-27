import {useAuth0} from "@auth0/auth0-react";
import {Button} from "../ui/button";
import UsernameMenu from "../UsernameMenu";
import {Loader2} from "lucide-react";
import {Link} from "react-router-dom";

const DesktopNav = () => {
  const {isAuthenticated, isLoading, loginWithPopup} = useAuth0();
  if (isLoading) return <Loader2 className="animate-spin text-orange-500" />;
  return (
    <div>
      <span className="flex space-x-4 items-center authenticated">
        {isAuthenticated && (
          <>
            <Link
              to="/order-status"
              className="font-semibold text-orange-600 hover:opacity-85 hover:underline "
            >
              My Orders
            </Link>
            <UsernameMenu />
          </>
        )}
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
export default DesktopNav;
