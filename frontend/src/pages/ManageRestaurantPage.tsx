import ManageRestaurantForm from "@/form/manage-restaurant-form/ManageRestaurantForm";
import {
  useCreateCurrentUserRestaurant,
  useGetCurrentUserRestaurant,
  useUpdateCurrentUserRestaurant,
} from "@/graphql/queries/currentUserRestaurant";
import {Loader2} from "lucide-react";

export default function ManageRestaurantPage() {
  const {createRestaurant, isLoading: isCreating} =
    useCreateCurrentUserRestaurant();
  const {restaurantData, isLoading: isGetting} = useGetCurrentUserRestaurant();
  const {updateRestaurant, isLoading: isUpdating} =
    useUpdateCurrentUserRestaurant();
  // @ts-ignore
  const isEditing = !!restaurantData?.data;
  console.log(isEditing);
  if (isGetting) {
    return (
      <Loader2 size={40} className="animate-spin text-orange-500 mx-auto" />
    );
  }
  return (
    <div>
      <ManageRestaurantForm
        restaurant={restaurantData}
        onSave={isEditing ? updateRestaurant : createRestaurant}
        isLoading={isCreating || isUpdating}
      />
    </div>
  );
}
