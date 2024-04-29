import {Request, Response} from "express";
import User from "../../models/user";
import Restaurant from "../../models/restaurant";
import {createLineItems} from "../../lib/stripe/lineItems";
import {createSession} from "../../lib/stripe/session";
import Order from "../../models/order";
import client from "../../redis/client";
import {currentUserKey} from "../../redis/keys";

export type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetail: {
    name: string;
    email: string;
    addressLine1: string;
    city: string;
    country: string;
  };
  restaurantId: string;
};

export const order = {
  createCheckoutSession: async (
    {
      checkout,
    }: {
      checkout: CheckoutSessionRequest;
    },
    context: {req: Request}
  ) => {
    try {
      const {req} = context;
      if (!req.userId) {
        throw new Error("Unauthorized");
      }
      const cacheUser = await client.get(currentUserKey(req.auth0Id));
      const user = JSON.parse(cacheUser!);
      const restaurant = await Restaurant.findById(
        checkout.restaurantId
      ).populate("menuItems");
      if (!restaurant) {
        throw new Error("Restaurant or User not found");
      }
      // Creating the new Order.
      const newOrder = new Order({
        restaurant: restaurant,
        user: req.userId,
        status: "placed",
        deliveryDetails: {
          addressLine1: checkout.deliveryDetail.addressLine1,
          email: checkout.deliveryDetail.email,
          city: checkout.deliveryDetail.city,
          name: checkout.deliveryDetail.name,
          country: checkout.deliveryDetail.country,
        },
        cartItems: checkout.cartItems,
        createdAt: new Date(),
      });
      const lineItems = createLineItems(checkout, restaurant.menuItems);

      const session = await createSession(
        lineItems,
        newOrder._id.toString(),
        restaurant.deliveryPrice,
        restaurant._id.toString(),
        user
      );
      if (!session.url) {
        throw new Error("Error creating stripe session");
      }

      await newOrder.save();
      return {url: session.url};
    } catch (error) {
      console.log(error);
      throw new Error("Unable to create checkout session");
    }
  },

  getCurrentUserOrder: async (_: any, context: {req: Request}) => {
    try {
      const {req} = context;
      if (!req.userId) {
        throw new Error("Unauthorized");
      }
      const orders = await Order.find({user: req.userId})
        .populate("restaurant")
        .populate("user")
        .sort({createdAt: -1});
      return orders;
    } catch (error) {
      console.log(error);
      throw new Error("Unable to get the current user order");
    }
  },
};
