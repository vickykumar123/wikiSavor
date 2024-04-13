import {DropdownMenu} from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {CircleUserRound, Loader2, User} from "lucide-react";
import {useAuth0} from "@auth0/auth0-react";
import {Link} from "react-router-dom";
import {Separator} from "./ui/separator";
import {Button} from "./ui/button";
import {useGetCurrentUser} from "@/graphql/queries/currentUser";

export default function UsernameMenu() {
  const {user, logout} = useAuth0();
  const {currentUserData, isLoading: isGetUserLoading} = useGetCurrentUser();
  if (isGetUserLoading)
    return <Loader2 className="animate-spin text-orange-500" />;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3 font-bold text-orange-600 hover:text-orange-500 gap-2 outline-none">
        <CircleUserRound className="text-orange-600" />
        {currentUserData?.name || user?.name}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        <DropdownMenuItem>
          <Link
            to="/user-profile"
            className="font-bold flex items-center gap-1 mx-auto text-orange-600 hover:text-orange-500"
          >
            <User size={20} className="text-red-900" /> User Profile
          </Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem>
          <Button
            onClick={() => logout()}
            className="flex flex-1 font-bold bg-orange-500 hover:bg-orange-400"
          >
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
