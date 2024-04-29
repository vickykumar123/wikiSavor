import {useGetNotification} from "@/graphql/queries/notification";
import {Popover, PopoverContent, PopoverTrigger} from "../ui/popover";
import {BellDot, Loader2} from "lucide-react";
import NotificationCard from "./NotificationCard";
import {Separator} from "../ui/separator";

export default function Notification() {
  const {notifications, isLoading, refetch} = useGetNotification();
  return (
    <Popover>
      <PopoverTrigger>
        <BellDot
          onClick={() => refetch()}
          className="text-orange-500  -rotate-12"
        />
        <PopoverContent className="bg-gray-100">
          <h2 className="text-lg font-semibold text-slate-600">
            Your recent notification
          </h2>
          <Separator />
          <div className="flex flex-col-reverse">
            {isLoading && <Loader2 className="text-orange-500 animate-spin" />}

            {!isLoading &&
              notifications?.map((notification) => (
                <>
                  <NotificationCard notification={notification} />
                  <Separator />
                </>
              ))}
          </div>
        </PopoverContent>
      </PopoverTrigger>
    </Popover>
  );
}
