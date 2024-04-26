import {Request, Response} from "express";
import Stripe from "stripe";
import User from "../../models/user";
import Restaurant from "../../models/restaurant";
import {Menu} from "../../types/modelType";

const STRIPE = new Stripe(process.env.STRIPE_API_KEY!);
const FRONTEND_URL = process.env.FRONTEND_URL;

type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  restaurantId: string;
};

function createLineItems(checkout: CheckoutSessionRequest, menuItems: Menu[]) {
  const lineItems = checkout.cartItems.map((cartItem) => {
    const menuItem = menuItems.find(
      (item) => item._id.toString() === cartItem.menuItemId.toString()
    );
    if (!menuItem) {
      throw new Error(`Menu item not found: ${cartItem.menuItemId}`);
    }

    const line_item: Stripe.Checkout.SessionCreateParams.LineItem = {
      price_data: {
        currency: "usd",
        unit_amount: menuItem.price,
        product_data: {
          name: menuItem.name,
        },
      },
      quantity: parseInt(cartItem.quantity),
    };
    return line_item;
  });
  return lineItems;
}

async function createSession(
  lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
  orderId: string,
  deliveryPrice: number,
  restaurantId: string
) {
  const sessionData = await STRIPE.checkout.sessions.create({
    line_items: lineItems,
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "Delivery",
          type: "fixed_amount",
          fixed_amount: {
            amount: deliveryPrice,
            currency: "usd",
          },
        },
      },
    ],
    mode: "payment",
    metadata: {
      orderId,
      restaurantId,
    },
    success_url: `${FRONTEND_URL}/order-status?success=true`,
    cancel_url: `${FRONTEND_URL}/detail/${restaurantId}?cancelled=true`,
  });

  return sessionData;
}
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
        restaurant._id.toString()
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
