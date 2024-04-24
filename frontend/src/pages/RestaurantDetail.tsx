import MenuItems from "@/components/MenuItems";
import RestaurantInfo from "@/components/RestaurantInfo";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import {Button} from "@/components/ui/button";
import {useGetRestaurantDetails} from "@/graphql/queries/restaurant";
import {Loader2} from "lucide-react";
import {useNavigate, useParams} from "react-router-dom";

export default function RestaurantDetail() {
  const navigate = useNavigate();
  const {restaurantId} = useParams();
  const {results: restaurant, isLoading} =
    useGetRestaurantDetails(restaurantId);

  if (isLoading || !restaurant) {
    return <Loader2 size={40} className="animate-spin text-orange-500" />;
  }
  return (
    <>
      <Button
        variant="link"
        className="text-blue-500 hover:underline"
        onClick={() => navigate(-1)}
      >
        &lt;- Back to List
      </Button>
      <div className="flex flex-col gap-10">
        <AspectRatio ratio={16 / 7}>
          <img
            src={restaurant.imageUrl}
            className="rounded-md object-cover h-full w-full"
          />
        </AspectRatio>
        <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
          <div className="flex flex-col gap-4">
            <RestaurantInfo restaurant={restaurant} />
            <span className="text-2xl font-bold tracking-tight">Menu</span>
            {restaurant.menuItems.map((menuItem) => (
              <MenuItems menuItem={menuItem} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
