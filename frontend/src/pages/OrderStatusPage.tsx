import OrderStatusDetail from "@/components/order/OrderStatusDetail";
import OrderStatusHeader from "@/components/order/OrderStatusHeader";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import {useGetCurrentUserOrder} from "@/graphql/queries/order";
import {Loader2} from "lucide-react";
import {Link} from "react-router-dom";

export default function OrderStatusPage() {
  const {userOrders, isLoading} = useGetCurrentUserOrder();
  if (isLoading) {
    return (
      <Loader2 size={42} className="text-orange-500 animate-spin mx-auto" />
    );
  }

  if (!userOrders || userOrders.length === 0) {
    return (
      <Link to="/" className="text-xl hover:underline hover:text-blue-500">
        You haven't ordered yet, click here to search and start ordering
      </Link>
    );
  }
  return (
    <div className="space-y-10">
      {userOrders.map((order) => (
        <div className="space-y-10 bg-gray-50 p-10 rounded-lg" key={order._id}>
          <OrderStatusHeader order={order} />
          <div className="grid gap-10 md:grid-cols-2">
            <OrderStatusDetail order={order} />
            <AspectRatio ratio={12 / 5}>
              <img
                src={order.restaurant.imageUrl}
                className="rounded-md object-cover h-full w-full"
              />
            </AspectRatio>
          </div>
        </div>
      ))}
    </div>
  );
}
