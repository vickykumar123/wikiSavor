import {Request, Response} from "express";
import Restaurant from "../../models/restaurant";

export const allRestaurant = {
  searchRestaurant: async (
    args: any,
    context: {req: Request; res: Response}
  ) => {
    try {
      const {req, res} = context;
      const city = args.city;
      const searchQuery = (req.query.searchQuery as string) || "";
      const selectedCuisines = (req.query.selectedCuisines as string) || "";
      const sortOptions = (req.query.sortOptions as string) || "lastUpdate";
      const page = parseInt(req.query.page as string) || 1;

      let query: any = {};
      query["city"] = new RegExp(city, "i");
      const cityCheck = await Restaurant.countDocuments(query);
      if (cityCheck === 0) {
        return {data: [], pagination: {total: 0, page: 1, pages: 1}};
      }
      if (selectedCuisines) {
        const cuisineArray = selectedCuisines
          .split(",")
          .map((cuisines) => new RegExp(cuisines, "i"));

        query["cuisines"] = {$all: cuisineArray};
      }
      if (searchQuery) {
        const searchRegex = new RegExp(searchQuery, "i");
        query["$or"] = [
          {restaurantName: searchRegex},
          {cuisines: {$in: [searchQuery]}},
          {"menuItems.name": searchRegex},
        ];
      }

      const pageSize = 10;
      const skip = (page - 1) * pageSize;
      const restaurant = await Restaurant.find(query)
        .sort({[sortOptions]: 1})
        .skip(skip)
        .limit(pageSize)
        .lean();
      const total = await Restaurant.countDocuments(query);
      const result = {
        data: restaurant,
        pagination: {
          total,
          page,
          pages: Math.ceil(total / pageSize),
        },
      };
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("Unable to search by city.");
    }
  },
};
