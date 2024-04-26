import {Request, Response} from "express";
import User from "../../models/user";
import Restaurant from "../../models/restaurant";
import {createLineItems} from "../../lib/stripe/lineItems";
import {createSession} from "../../lib/stripe/session";

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

      const lineItems = createLineItems(checkout, restaurant.menuItems);

      const session = await createSession(
        lineItems,
        "TEST_ORDER_ID",
        restaurant.deliveryPrice,
        restaurant._id.toString(),
        user
      );
      if (!session.url) {
        throw new Error("Error creating stripe session");
      }

      return {url: session.url};
    } catch (error) {
      console.log(error);
      throw new Error("Unable to create checkout session");
    }
  },
};
