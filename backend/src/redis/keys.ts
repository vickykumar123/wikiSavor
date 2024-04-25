export const currentUserKey = (auth0Id: string) => `currentUser#${auth0Id}`;
export const userRestaurantKey = (userId: string) => `userRestaurant#${userId}`;
export const restaurantDetailKey = (restaurantId: string) =>
  `restaurant#${restaurantId}`;
