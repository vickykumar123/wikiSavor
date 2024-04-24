import {Restaurant} from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {Dot, LandPlot, MapPin} from "lucide-react";

interface Props {
  restaurant: Restaurant;
}

export default function RestaurantInfo({restaurant}: Props) {
  return (
    <Card className="border-sla shadow-lg">
      <CardHeader>
        <CardTitle className="text-3xl font-extrabold tracking-tight capitalize">
          {restaurant.restaurantName}
        </CardTitle>
        <CardDescription>
          <div className="flex gap-2 font-semibold mb-3">
            <span className="flex items-center gap-1 text-xs italic text-gray-500">
              <LandPlot size={20} /> {restaurant.city}
            </span>
            <span className="flex items-center gap-1 text-xs italic text-gray-500">
              <MapPin size={20} /> {restaurant.country}
            </span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap space-y-1 items-center">
        {restaurant.cuisines.map((item, index) => (
          <span className="flex items-center" key={index}>
            <span className="capitalize italic font-semibold bg-gray-500/80 text-white w-full p-1  text-sm text-center rounded-md">
              {item}
            </span>
            {index < restaurant.cuisines.length - 1 && <Dot />}
          </span>
        ))}
      </CardContent>
    </Card>
  );
}
