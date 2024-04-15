import {DropdownMenu} from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {Hotel, User} from "lucide-react";
import {useAuth0} from "@auth0/auth0-react";
import {Link} from "react-router-dom";
import {Separator} from "./ui/separator";
import {Button} from "./ui/button";

export default function UsernameMenu() {
  const {user, logout} = useAuth0();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3 font-bold text-orange-600 hover:text-orange-500 gap-2 outline-none">
        <img
          src={user?.picture}
          alt="profile pic"
          className="w-9 h-9 rounded-full"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        <DropdownMenuItem>
          <Link
            to="/user-profile"
            className="font-bold flex items-center gap-2 text-orange-600 hover:text-orange-500"
          >
            <User size={20} className="text-red-900" /> My Profile
          </Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem>
          <Link
            to="/manage-restaurant"
            className="font-bold flex items-center gap-2 text-orange-600 hover:text-orange-500"
          >
            <Hotel size={20} className="text-red-900" />
            Manage Restaurant
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
