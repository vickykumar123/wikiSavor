import {Request, Response} from "express";
import Stripe from "stripe";
import Order from "../models/order";

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
    const order = await Order.findById(event.data.object.metadata?.orderId);
    if (!order) {
      return res.status(404).json({message: "Order not found"});
    }
    order.totalAmount = event.data.object.amount_total! / 100;
    order.status = "paid";
    await order.save();
  }
  res.status(200).send();
}
