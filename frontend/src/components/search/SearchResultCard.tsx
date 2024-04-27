import {Restaurant} from "@/types";
import {Link} from "react-router-dom";
import {CircleDollarSignIcon, Clock, Dot, LandPlot, MapPin} from "lucide-react";
import {AspectRatio} from "../ui/aspect-ratio";
import {Button} from "../ui/button";

type SearchResultCardProps = {
  restaurant: Restaurant;
};
export default function SearchResultCard({restaurant}: SearchResultCardProps) {
  return (
    <Link
      to={`/detail/${restaurant._id}`}
      className="grid md:grid-cols-[2fr_3fr] gap-5 group hover:bg-gray-400/20 rounded-md hover:scale-105 transition-all"
    >
      <AspectRatio ratio={15 / 7}>
        <img
          src={restaurant.imageUrl}
          className="rounded-md w-full h-full object-cover"
        />
      </AspectRatio>
      <div className="xl:relative">
        <h3 className="text-2xl font-extrabold tracking-tight mb-2 group-hover:underline uppercase line-clamp-1">
          {restaurant.restaurantName}
        </h3>
        <div className="flex gap-2 font-semibold mb-3">
          <span className="flex items-center gap-1 text-xs italic text-gray-500">
            <LandPlot size={20} /> {restaurant.city}
          </span>
          <span className="flex items-center gap-1 text-xs italic text-gray-500">
            <MapPin size={20} /> {restaurant.country}
          </span>
        </div>
        <div id="card-content" className="grid md:grid-cols-2 gap-4">
          <div className="flex flex-wrap">
            <p className="mr-2 mb-1 font-semibold">Tastes of 🧑🏻‍🍳: </p>
            {restaurant.cuisines.slice(0, 3).map((item, index) => (
              <span className="flex" key={index}>
                <span className="capitalize italic font-semibold bg-gray-500/80 text-white w-full p-1 h-6 text-xs rounded-md">
                  {item}
                </span>
                {index < restaurant.cuisines.length - 1 && <Dot />}
              </span>
            ))}
            <span className=" bg-gray-500/80 text-white p-1 h-6 text-xs rounded-md">
              {restaurant.cuisines.length > 3 &&
                `+${restaurant.cuisines.length - 3} more`}
            </span>
          </div>
          <div className="flex gap-2 flex-col">
            <div className="flex items-center gap-1 text-green-600 tracking-tight font-semibold">
              <Clock className="text-green-600" />
              {restaurant.estimatedDeliveryTime} mins
            </div>
            <div className="flex items-center gap-1 tracking-tight font-semibold text-yellow-500">
              <CircleDollarSignIcon />
              Delivery from ${(restaurant.deliveryPrice / 100).toFixed(2)}
            </div>
          </div>
        </div>
        <Button
          variant="submit"
          className="order-now xl:absolute lg:right-36 md:bottom-0 md:mb-2 mt-2 w-full md:w-40"
        >
          Order now
        </Button>
      </div>
    </Link>
  );
}
