import {dateFomatter} from "@/lib/dateFormatter";
import {Notification} from "@/types";
import {useMemo} from "react";

interface NotificationCardProps {
  notification: Notification;
}
export default function NotificationCard({
  notification,
}: NotificationCardProps) {
  const getTime = useMemo(() => {
    const createdAt = new Date(+notification.createdAt);
    return dateFomatter(createdAt);
  }, [notification.createdAt]);
  return (
    <div className="p-2 relative">
      <section className="font-medium text-slate-700/70 text-wrap">
        {notification.message}
      </section>
      <section className="text-xs text-end italic text-gray-500">
        {getTime}
      </section>
    </div>
  );
}
