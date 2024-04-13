import {CircleUserRound, Menu} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {Separator} from "../ui/separator";
import {Button} from "../ui/button";
import {useAuth0} from "@auth0/auth0-react";
import MobileNavLinks from "./MobileNavLinks";

export default function MobileNav() {
  const {isAuthenticated, loginWithRedirect, user} = useAuth0();
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-orange-500" />
      </SheetTrigger>
      <SheetContent className="bg-gray-100/60 rounded-l-md border-l-orange-600">
        <SheetTitle>
          {!isAuthenticated ? (
            <span className="font-mono italic text-orange-600 font-semibold text-center">
              Welcome to wikiSavor
            </span>
          ) : (
            <span className="flex items-center  font-bold text-orange-700  gap-2 outline-none">
              <CircleUserRound /> {user?.email}
            </span>
          )}
        </SheetTitle>
        <Separator className="mb-3" />
        <SheetDescription className="flex">
          {!isAuthenticated ? (
            <Button
              className="flex-1 font-bold bg-orange-500 text-white"
              variant="outline"
              onClick={() => loginWithRedirect()}
            >
              Log In
            </Button>
          ) : (
            <MobileNavLinks />
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
}
