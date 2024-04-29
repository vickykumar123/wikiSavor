import OrderItemCard from "@/components/order/OrderItemCard";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import ManageRestaurantForm from "@/form/manage-restaurant-form/ManageRestaurantForm";
import {
  useCreateCurrentUserRestaurant,
  useDeliveredOrder,
  useGetCurrentUserRestaurant,
  useGetCurrentUserRestaurantOrder,
  useUpdateCurrentUserRestaurant,
} from "@/graphql/queries/currentUserRestaurant";
import {Order} from "@/types";
import {Loader2} from "lucide-react";

export default function ManageRestaurantPage() {
  const {createRestaurant, isLoading: isCreating} =
    useCreateCurrentUserRestaurant();
  const {restaurantData, isLoading: isGetting} = useGetCurrentUserRestaurant();
  const {updateRestaurant, isLoading: isUpdating} =
    useUpdateCurrentUserRestaurant();
  const {orders, isLoading: isOrderLoading} =
    useGetCurrentUserRestaurantOrder();
  const {deliveredResult, isLoading: isDeliveredLoading} = useDeliveredOrder();
  // @ts-ignore
  const isEditing = !!restaurantData?.data;
  if (isGetting || isOrderLoading || isDeliveredLoading) {
    return (
      <Loader2 size={40} className="animate-spin text-orange-500 mx-auto" />
    );
  }
  return (
    <div>
      <Tabs defaultValue="orders">
        <TabsList>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
        </TabsList>
        <TabsContent
          value="orders"
          className="space-y-5 bg-gray-50 pg-10 rounded-lg "
        >
          <h2 className="text-2xl font-bold">
            {orders?.length || 0} active orders
          </h2>
          {orders?.map((order: Order) => (
            <OrderItemCard key={order._id} order={order} />
          ))}
          <h2 className="text-2xl font-bold">Order Delivered</h2>
          {deliveredResult?.map((delivered: Order) => (
            <OrderItemCard key={delivered._id} order={delivered} />
          ))}
        </TabsContent>
        <TabsContent value="manage-restaurant">
          <ManageRestaurantForm
            restaurant={restaurantData}
            onSave={isEditing ? updateRestaurant : createRestaurant}
            isLoading={isCreating || isUpdating}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
