import {currentUser} from "./currentUser";
import {restaurant} from "./restaurant";

export const resolver = {
  ...currentUser,
  ...restaurant,
};
