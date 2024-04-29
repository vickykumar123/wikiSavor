import {Request, Response} from "express";
import Restaurant from "../../models/restaurant";
import {Restaurant as RestaurantType} from "../../types/modelType";
import client from "../../redis/client";
import {
  currentUserNotification,
  deliveredOrderKey,
  userRestaurantKey,
} from "../../redis/keys";
import Order from "../../models/order";
import {deleteRestaurantCache} from "../../lib/delete-cache/restaurant-cache";
import {createNotification} from "../../lib/notification/createNotification";

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
      await createNotification(
        `Created restaurant ${restaurant.restaurantName} successfully`,
        req.userId.toString()
      );
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
      await createNotification(
        `Updated restaurant ${restaurant.restaurantName}`,
        req.userId.toString()
      );
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

      const userRestaurant = await Restaurant.findOne({
        user: req.userId,
      });

      if (!userRestaurant) {
        throw new Error("Restaurant not found");
      }

      const orders = await Order.find({
        restaurant: userRestaurant._id,
        status: {$ne: "delivered"},
      })
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
      if (order.status === "delivered") {
        await createNotification(
          "Your order has been delivered",
          order.user._id.toString()
        );
        await client.del(deliveredOrderKey(req.userId));
      }

      return order;
    } catch (error) {
      console.log("Unable to update the order");
    }
  },

  deliveredOrdered: async (_: any, context: {req: Request}) => {
    try {
      const {req} = context;
      if (!req.userId) {
        throw new Error("Unauthorized");
      }

      const deliveredOrderCache = await client.get(
        deliveredOrderKey(req.userId)
      );

      if (deliveredOrderCache !== null && deliveredOrderCache !== "null") {
        return JSON.parse(deliveredOrderCache);
      }

      const userRestaurant = await Restaurant.findOne({
        user: req.userId,
      });

      if (!userRestaurant) {
        throw new Error("Restaurant not found");
      }

      const orders = await Order.find({
        restaurant: userRestaurant._id,
        status: {$eq: "delivered"},
      })
        .populate("restaurant")
        .populate("user")
        .limit(5)
        .sort({createdAt: -1});
      await client.set(deliveredOrderKey(req.userId), JSON.stringify(orders));
      return orders;
    } catch (error) {
      throw new Error("Unable to fetch the delivered order");
    }
  },
};
