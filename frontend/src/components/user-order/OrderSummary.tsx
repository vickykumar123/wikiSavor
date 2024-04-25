import {CartItem, Restaurant} from "@/types";
import {CardContent, CardHeader, CardTitle} from "../ui/card";
import {Badge} from "../ui/badge";
import {Trash} from "lucide-react";
import {Separator} from "../ui/separator";

interface Props {
  restaurant: Restaurant;
  cartItems: CartItem[];
  removeFromCart: (cartItem: CartItem) => void;
}

export default function OrderSummary({
  restaurant,
  cartItems,
  removeFromCart,
}: Props) {
  function getTotalCost() {
    if (cartItems.length === 0) {
      return 0;
    }
    const totalCost = cartItems.reduce(
      (total, cartItems) => total + cartItems.price * cartItems.quantity,
      0
    );

    const totalWithDelivery = totalCost + restaurant.deliveryPrice;
    return totalWithDelivery.toFixed(2);
  }

  if (cartItems.length === 0) {
    return (
      <CardHeader>
        <p className="font-semibold">
          Click on add to cart, To start ordering.
        </p>
      </CardHeader>
    );
  }

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span>Your Order</span>
          <span>${getTotalCost()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {cartItems.map((item) => (
          <div className="flex justify-between">
            <span>
              <Badge variant="outline" className="mr-2">
                {item.quantity}
              </Badge>
              {item.name}
            </span>
            <span className="flex items-center gap-1 ">
              <Trash
                className="cursor-pointer hover:fill-red-500"
                color="red"
                size={20}
                onClick={() => removeFromCart(item)}
              />
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>${restaurant.deliveryPrice.toFixed(2)}</span>
        </div>
        <Separator />
      </CardContent>
    </>
  );
}
