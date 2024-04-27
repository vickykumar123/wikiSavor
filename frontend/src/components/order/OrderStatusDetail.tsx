import {Order} from "@/types";
import {Separator} from "../ui/separator";

type Props = {
  order: Order;
};

const OrderStatusDetail = ({order}: Props) => {
  return (
    <div className="space-y-5">
      <div className="flex flex-col">
        <span className="font-bold">Delivering to:</span>
        <span>{order.deliveryDetails.name}</span>
        <span>
          {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold">Your Order</span>
        <ul>
          {order.cartItems.map((item) => (
            <li key={item.menuItemsId}>
              {item.name} x {item.quantity}
            </li>
          ))}
        </ul>
      </div>
      <Separator />
      {order.status !== "placed" ? (
        <>
          <div className="flex gap-2">
            <span className="font-bold">Total: </span>
            <span>${order.totalAmount?.toFixed(2)}</span>
          </div>
          <p className="text-green-500 font-semibold">
            Payment has made successfully.
          </p>
        </>
      ) : (
        <span className="text-red-500 font-semibold">
          Payment not made, Will give bill on delivery
        </span>
      )}
    </div>
  );
};

export default OrderStatusDetail;
