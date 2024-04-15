import {Hotel, User} from "lucide-react";
import {Link} from "react-router-dom";
import {Button} from "../ui/button";
import {useAuth0} from "@auth0/auth0-react";
import {Separator} from "../ui/separator";

export default function MobileNavLinks() {
  const {logout} = useAuth0();
  return (
    <div className="flex flex-col w-full space-y-2">
      <Link
        to="/user-profile"
        className="font-bold text-lg flex items-center gap-3 text-orange-700 hover:text-orange-500"
      >
        <User size={24} className="text-red-900" /> My Profile
      </Link>
      <Separator />
      <Link
        to="/manage-resturant"
        className="font-bold text-lg flex items-center gap-3 text-orange-700 hover:text-orange-500"
      >
        <Hotel size={24} className="text-red-900" /> Manage Restaurant
      </Link>
      <Separator />
      <Button
        onClick={() => logout()}
        className="flex flex-1 font-bold bg-orange-500 hover:bg-orange-400"
      >
        Log Out
      </Button>
    </div>
  );
}
