import {Request, Response} from "express";
import User from "../../models/user";
import Restaurant from "../../models/restaurant";
import {createLineItems} from "../../lib/stripe/lineItems";
import {createSession} from "../../lib/stripe/session";
import Order from "../../models/order";

export type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  restaurantId: string;
};

export const order = {
  createCheckoutSession: async (
    {
      checkout,
    }: {
      checkout: CheckoutSessionRequest;
    },
    context: {req: Request; res: Response}
  ) => {
    try {
      const {req, res} = context;
      if (!req.userId) {
        throw new Error("Unauthorized");
      }
      const user = await User.findById(req.userId);
      const restaurant = await Restaurant.findById(
        checkout.restaurantId
      ).populate("menuItems");
      if (!user || !restaurant) {
        throw new Error("Restaurant or User not found");
      }
      const newOrder = new Order({
        restaurant: restaurant,
        user: req.userId,
        status: "placed",
        deliveryDetails: {
          email: user.email,
          addressLine1: user.addressLine1,
          city: user.city,
          name: user.name,
          country: user.country,
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
      // Creating the new Order.

      newOrder.save();
      return {url: session.url};
    } catch (error) {
      console.log(error);
      throw new Error("Unable to create checkout session");
    }
  },
};
