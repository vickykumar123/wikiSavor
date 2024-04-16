import {Request, Response} from "express";
import Restaurant from "../../models/restaurant";
import {Restaurant as RestaurantType} from "../../types/modelType";

export const restaurant = {
  createUserRestaurant: async (
    {
      restaurantInput,
    }: {
      restaurantInput: RestaurantType;
    },
    context: {req: Request; res: Response}
  ) => {
    try {
      const {req, res} = context;
      console.log(req.file);
      const {
        restaurantName,
        city,
        country,
        deliveryPrice,
        estimatedDeliveryTime,
        cuisines,
        menuItems,
        imageUrl,
      } = restaurantInput;
      const existingRestaurant = await Restaurant.find({user: req.userId});
      if (existingRestaurant.length) {
        throw new Error(
          "You already have restaurant, You can't create only one."
        );
      }
      const restaurant = await Restaurant.create({
        user: req.userId,
        restaurantName,
        city,
        country,
        cuisines,
        estimatedDeliveryTime,
        deliveryPrice,
        menuItems,
        imageUrl,
        lastUpdate: new Date(),
      });
      const fullRestaurant = await restaurant.populate({
        path: "menu",
        strictPopulate: false,
      });
      return fullRestaurant;
    } catch (error) {
      console.log(error);
      throw new Error("Unable to create the restaurant");
    }
  },

  getCurrentUserRestaurant: async (
    _: any,
    context: {req: Request; res: Response}
  ) => {
    try {
      const {req, res} = context;
      if (!req.userId) {
        throw new Error("Unauthorized");
      }

      const restaurant = await Restaurant.findOne({user: req.userId}).populate(
        "user"
      );
      if (!restaurant) {
        throw new Error("Restaurant not found");
      }
      return restaurant;
    } catch (error) {
      console.log(error);
      throw new Error("Unable to get restaurant details");
    }
  },
};
