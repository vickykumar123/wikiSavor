import {useGetNotification} from "@/graphql/queries/notification";
import {Popover, PopoverContent, PopoverTrigger} from "../ui/popover";
import {Bell, BellDot, Loader2} from "lucide-react";
import NotificationCard from "./NotificationCard";
import {Separator} from "../ui/separator";
import {useSocket} from "@/hooks/useSocket";
import {useEffect, useState} from "react";

export default function Notification() {
  const {notifications, isLoading, refetch} = useGetNotification();
  const [isNotification, setNotification] = useState(false);
  const socket = useSocket();
  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "notification") {
        console.log("Recieved notification");
        setNotification(true);
      }
    };
  }, [socket]);

  function notificationHandler() {
    refetch();
    setNotification(false);
  }

  return (
    <Popover>
      <PopoverTrigger>
        {isNotification ? (
          <BellDot
            onClick={notificationHandler}
            className="text-orange-500  -rotate-12 fill-orange-400 scale-105"
          />
        ) : (
          <Bell
            onClick={() => refetch()}
            className="text-orange-500  hover:fill-orange-400"
          />
        )}
        <PopoverContent className="bg-gray-100">
          <h2 className="text-lg font-semibold text-slate-600">
            Your recent notification
          </h2>
          <Separator />
          <div className="flex flex-col-reverse">
            {isLoading && <Loader2 className="text-orange-500 animate-spin" />}
            {notifications?.length === 0 && (
              <p className="text-slate-600 text-sm">No notification yet</p>
            )}
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
