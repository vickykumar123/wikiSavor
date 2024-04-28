import {Request} from "express";
import client from "../../redis/client";
import {
  currentUserRestaurantKey,
  restaurantDetailKey,
  userRestaurantKey,
} from "../../redis/keys";
import {Restaurant} from "../../types/modelType";

export const deleteRestaurantCache = async (
  req: Request,
  restaurant: Restaurant
) => {
  return Promise.all([
    client.del(userRestaurantKey(req.userId)),
    client.del(restaurantDetailKey(restaurant._id.toString())),
    client.del(currentUserRestaurantKey(req.userId)),
  ]);
};
