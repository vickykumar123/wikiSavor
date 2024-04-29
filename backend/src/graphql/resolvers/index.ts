import {allRestaurant} from "./allRestaurant";
import {currentUser} from "./currentUser";
import {restaurant} from "./currentUserRestaurant";
import {notification} from "./notification";
import {order} from "./order";

export const resolver = {
  ...currentUser,
  ...restaurant,
  ...allRestaurant,
  ...order,
  ...notification,
};
