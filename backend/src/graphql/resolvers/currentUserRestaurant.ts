import {Request, Response} from "express";
import Restaurant from "../../models/restaurant";
import {Restaurant as RestaurantType} from "../../types/modelType";
import client from "../../redis/client";
import {currentUserRestaurantKey, userRestaurantKey} from "../../redis/keys";
import Order from "../../models/order";
import {deleteRestaurantCache} from "../../lib/delete-cache/restaurant-cache";

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
      if (!req.userId) {
        throw new Error("Unauthorized");
      }
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
      const restaurantCache = await client.get(userRestaurantKey(req.userId));
      if (restaurantCache !== null && restaurantCache !== "null") {
        return JSON.parse(restaurantCache!);
      }
      const restaurant = await Restaurant.findOne({
        user: req.userId,
      }).populate("user");
      if (!restaurant) {
        throw new Error("Restaurant not found");
      }
      await client.set(
        userRestaurantKey(req.userId),
        JSON.stringify(restaurant)
      );
      return restaurant;
    } catch (error) {
      console.log(error);
      throw new Error("Unable to get restaurant details");
    }
  },

  updateCurrentUserRestaurant: async (
    {
      restaurantInput,
    }: {
      restaurantInput: RestaurantType;
    },
    context: {req: Request; res: Response}
  ) => {
    try {
      const {req, res} = context;
      if (!req.userId) {
        throw new Error("Unauthorized");
      }
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
      const restaurant = await Restaurant.findOne({user: req.userId});
      if (!restaurant) {
        throw new Error("Restaurant does not exist.");
      }

      restaurant.restaurantName = restaurantName;
      restaurant.city = city;
      restaurant.country = country;
      restaurant.deliveryPrice = deliveryPrice;
      restaurant.estimatedDeliveryTime = estimatedDeliveryTime;
      restaurant.cuisines = cuisines;
      restaurant.menuItems = menuItems;
      restaurant.imageUrl = imageUrl;
      restaurant.lastUpdate = new Date();
      await restaurant.save();
      const fullRestaurant = await restaurant.populate({
        path: "menu",
        strictPopulate: false,
      });
      await deleteRestaurantCache(req, restaurant);
      return fullRestaurant;
    } catch (error) {
      console.log(error);
      throw new Error("Unable to create the restaurant");
    }
  },

  currentUserRestaurantOrders: async (_: any, context: {req: Request}) => {
    try {
      const {req} = context;
      if (!req.userId) {
        throw new Error("Unauthorized");
      }
      let userRestaurant;
      const restaurantIdCache = await client.get(
        currentUserRestaurantKey(req.userId)
      );
      if (restaurantIdCache !== null && restaurantIdCache !== "null") {
        userRestaurant = JSON.parse(restaurantIdCache);
      } else {
        userRestaurant = await Restaurant.findOne({user: req.userId});
        await client.set(
          currentUserRestaurantKey(req.userId),
          JSON.stringify(userRestaurant)
        );
      }
      if (!userRestaurant) {
        throw new Error("Restaurant not found");
      }

      const orders = await Order.find({restaurant: userRestaurant._id})
        .populate("restaurant")
        .populate("user");
      return orders;
    } catch (error) {
      throw new Error("Unable to fetch the order");
    }
  },

  updateOrderStatus: async (
    {
      orderId,
      status,
    }: {
      orderId: string;
      status: "placed" | "paid" | "inProgress" | "outForDelivery" | "delivered";
    },
    context: {req: Request}
  ) => {
    try {
      const {req} = context;
      if (!req.userId) {
        throw new Error("Unauthorized");
      }

      const order = await Order.findById(orderId);
      if (!order) {
        throw new Error("No orders found");
      }
      const restaurant = await Restaurant.findById(order.restaurant);
      if (restaurant?.user._id.toString() !== req.userId) {
        throw new Error("You are not allowed to make changes");
      }
      order.status = status;
      await order.save();
      return order;
    } catch (error) {
      console.log("Unable to update the order");
    }
  },
};
