import {Menu} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {Separator} from "../ui/separator";
import {Button} from "../ui/button";

export default function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-orange-500" />
      </SheetTrigger>
      <SheetContent className="bg-gray-100/40 rounded-l-md border-l-orange-600">
        <SheetTitle>
          <span className="font-mono italic text-orange-800 font-semibold text-center">
            Welcome to wikiSavor
          </span>
        </SheetTitle>
        <Separator className="mb-3" />
        <SheetDescription className="flex">
          <Button
            className="flex-1 font-bold bg-orange-500 text-white"
            variant="outline"
          >
            Log In
          </Button>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
}
