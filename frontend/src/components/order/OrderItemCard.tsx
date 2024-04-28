import {Order, OrderStatus} from "@/types";
import {Card, CardContent, CardHeader, CardTitle} from "../ui/card";
import {Separator} from "../ui/separator";
import {Badge} from "../ui/badge";
import {Label} from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {ORDER_STATUS} from "@/lib/order-status-config";
import {dateFomatter} from "@/lib/dateFormatter";
import {useUpdateOrderStatus} from "@/graphql/queries/currentUserRestaurant";
import {useEffect, useState} from "react";

interface OrderItemCardProps {
  order: Order;
}

export default function OrderItemCard({order}: OrderItemCardProps) {
  const {updateRestaurantStatus, isLoading} = useUpdateOrderStatus();
  const [status, setStatus] = useState<OrderStatus>(order.status);
  useEffect(() => {
    setStatus(order.status);
  }, [order.status]);

  const handleStatusChange = (newStatus: OrderStatus) => {
    updateRestaurantStatus({orderId: order._id, status: newStatus});
    setStatus(newStatus);
  };

  const getTime = () => {
    const orderDateTime = new Date(+order.createdAt);
    return dateFomatter(orderDateTime);
  };
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="grid md:grid-cols-4 gap-4 justify-between mb-3">
          <div>
            Customer Name:
            <span className="ml-2 font-normal">
              {order.deliveryDetails.name}
            </span>
          </div>
          <div>
            Delivery address:
            <span className="ml-2 font-normal">
              {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
            </span>
          </div>
          <div>
            Time:
            <span className="ml-2 font-normal">{getTime()}</span>
          </div>
          <div>
            Total Cost:
            <span className="ml-2 font-normal">
              ${order.totalAmount.toFixed(2)}
            </span>
          </div>
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          {order.cartItems.map((cartItem) => (
            <span key={cartItem.menuItemsId}>
              <Badge variant="outline" className="mr-2">
                {cartItem.quantity}
              </Badge>
              x {cartItem.name}
            </span>
          ))}
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="status">What is the status of this order?</Label>
          <Select
            value={status}
            disabled={isLoading}
            onValueChange={(value) => handleStatusChange(value as OrderStatus)}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent position="popper">
              {ORDER_STATUS.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
