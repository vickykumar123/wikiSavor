import ManageRestaurantForm from "@/form/manage-restaurant-form/ManageRestaurantForm";
import {useCreateCurrentUserRestaurant} from "@/graphql/queries/currentUserRestaurant";

export default function ManageRestaurantPage() {
  const {createRestaurant, isLoading} = useCreateCurrentUserRestaurant();
  return (
    <div>
      <ManageRestaurantForm onSave={createRestaurant} isLoading={isLoading} />
    </div>
  );
}
