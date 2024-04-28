import {Order} from "@/types";
import {useMemo} from "react";
import {Progress} from "../ui/progress";
import {ORDER_STATUS} from "@/lib/order-status-config";
import {dateFomatter} from "@/lib/dateFormatter";

interface OrderStatusHeaderProps {
  order: Order;
}

export default function OrderStatusHeader({order}: OrderStatusHeaderProps) {
  const getExpectedDelivery = useMemo(() => {
    const created = new Date(+order.createdAt);
    created.setMinutes(
      created.getMinutes() + order.restaurant.estimatedDeliveryTime
    );
    return dateFomatter(created);
  }, [order.createdAt, order.restaurant.estimatedDeliveryTime]);

  const getOrderInfo = useMemo(() => {
    return (
      ORDER_STATUS.find((o) => o.value === order.status) || ORDER_STATUS[0]
    );
  }, [order.status]);
  return (
    <>
      <h1 className="md:text-2xl font-bold tracking-tight flex flex-col gap-5 md:flex-row md:justify-between">
        <span className="capitalize"> Order Status: {getOrderInfo.label}</span>
        <span className="text-lg text-gray-600/90 font-medium">
          Expected by: {getExpectedDelivery}
        </span>
      </h1>
      <Progress className="animate-pulse" value={getOrderInfo.progressValue} />
    </>
  );
}
