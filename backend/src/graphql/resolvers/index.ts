import {allRestaurant} from "./allRestaurant";
import {currentUser} from "./currentUser";
import {restaurant} from "./currentUserRestaurant";

export const resolver = {
  ...currentUser,
  ...restaurant,
  ...allRestaurant,
};
