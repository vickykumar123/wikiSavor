import {Request} from "express";
import client from "../../redis/client";
import {
  currentUserNotification,
  storeNotificationCache,
} from "../../redis/keys";
import Notification from "../../models/notification";

type Notification = {
  message: string;
  createdAt: string | number | Date;
};

export const notification = {
  getNotification: async (_: any, context: {req: Request}) => {
    try {
      const {req} = context;
      if (!req.userId) {
        throw new Error("Unauthorized");
      }

      while (true) {
        const notification = await client.rPop(
          currentUserNotification(req.userId)
        );
        const listLen = await client.lLen(storeNotificationCache(req.userId));
        if (listLen > 10) {
          await client.lPop(storeNotificationCache(req.userId));
        }
        if (notification === null || notification === "null") {
          break;
        }
        const parsedNotification: Notification = JSON.parse(notification);

        await client.rPush(
          storeNotificationCache(req.userId),
          JSON.stringify({
            message: parsedNotification.message,
            createdAt: parsedNotification.createdAt,
          })
        );

        await Notification.create({
          user: req.userId,
          message: parsedNotification.message,
          createdAt: parsedNotification.createdAt,
        });
      }

      const notificationFromCache = await client.lRange(
        storeNotificationCache(req.userId),
        0,
        -1
      );
      const notificationArray: Notification[] = [];
      notificationFromCache.forEach((notification) => {
        const parsed = JSON.parse(notification);
        notificationArray.push({
          message: parsed.message,
          createdAt: parsed.createdAt,
        });
      });
      return notificationArray;
    } catch (error) {
      throw new Error("Unable to get the notification");
    }
  },
};
