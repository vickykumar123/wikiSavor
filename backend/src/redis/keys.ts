export const currentUserKey = (auth0Id: string) => `currentUser#${auth0Id}`;
export const userRestaurantKey = (userId: string) => `userRestaurant#${userId}`;
export const restaurantDetailKey = (restaurantId: string) =>
  `restaurant#${restaurantId}`;
export const deliveredOrderKey = (userId: string) => `deliveredOrder#${userId}`;
export const currentUserNotification = (userId: string) =>
  `myNotification#${userId}`;
export const storeNotificationCache = (userId: string) =>
  `cacheNotification#${userId}`;
