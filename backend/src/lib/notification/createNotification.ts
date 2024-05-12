import {socket} from "../..";
import client from "../../redis/client";
import {currentUserNotification} from "../../redis/keys";

export async function createNotification(message: string, userId: string) {
  const notification = {
    message,
    createdAt: new Date().getTime(),
  };

  await client.lPush(
    currentUserNotification(userId),
    JSON.stringify(notification)
  );
  socket?.send(
    JSON.stringify({
      type: "notification",
      message: "Sent a notification",
    })
  );
  console.log("Sent the notification");
}
