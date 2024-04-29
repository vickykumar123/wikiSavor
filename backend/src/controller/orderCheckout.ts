import {Request, Response} from "express";
import Stripe from "stripe";
import Order from "../models/order";
import {createNotification} from "../lib/notification/createNotification";

const STRIPE = new Stripe(process.env.STRIPE_API_KEY!);
export async function orderCheckoutWebhook(req: Request, res: Response) {
  let event;
  try {
    const sig = req.headers["stripe-signature"];
    event = STRIPE.webhooks.constructEvent(
      req.body,
      sig as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: `Webhook error`,
    });
  }

  if (event.type === "checkout.session.completed") {
    const order = await Order.findById(event.data.object.metadata?.orderId)
      .populate("restaurant")
      .populate("user");
    if (!order) {
      return res.status(404).json({message: "Order not found"});
    }
    order.totalAmount = event.data.object.amount_total! / 100;
    order.status = "paid";
    await order.save();

    await createNotification(
      `Successfully placed order in ${order.restaurant.restaurantName}`,
      order.user._id.toString()
    );
    await createNotification(
      `Recieved order from ${order.user.name}`,
      order.restaurant.user._id
    );
  }
  res.status(200).send();
}
