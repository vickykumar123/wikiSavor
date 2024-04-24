import {API_URL} from "@/lib/contants";
import {fetchApi} from "@/lib/fetchApi";
import {SearchState} from "@/pages/SearchPage";
import {Restaurant} from "@/types";
import {useQuery} from "react-query";

export const useSearchRestaurant = (
  searchState: SearchState,
  city?: string
) => {
  const createSearchRequest = async () => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedCuisines", searchState.selectedCuisines.join(","));
    params.set("sortOption", searchState.sortOption);
    const requestBody = {
      query: `query SearchRestaurant($city:String){
            searchRestaurant(city:$city){
              data{
                _id
                restaurantName
                country
                city
                imageUrl
                cuisines
                deliveryPrice
                estimatedDeliveryTime
              }
              pagination{
                total
                page
                pages
              }
            }
          }`,
      variables: {
        city,
      },
    };

    const response = await fetch(`${API_URL}?${params.toString()}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    if (!response.ok) {
      throw new Error("Unable to fetch the request");
    }
    const results = await response.json();
    return results.data.searchRestaurant;
  };
  const {data: results, isLoading} = useQuery(
    ["searchRequest", searchState],
    createSearchRequest,
    {enabled: !!city}
  );
  return {results, isLoading};
};

export const useGetRestaurantDetails = (restaurantId?: string) => {
  const getRestaurantDetails = async (): Promise<Restaurant> => {
    const requestBody = {
      query: `query RestaurantDetail($restaurantId:String!){
        restaurantDetail(restaurantId:$restaurantId){
          _id
          restaurantName
          city
          country
          deliveryPrice
          estimatedDeliveryTime
          cuisines
          menuItems{
            _id
            name
            price
          }
          imageUrl
        }
      }`,
      variables: {
        restaurantId,
      },
    };

    const response = await fetchApi(requestBody);
    if (!response.ok) {
      throw new Error("Unable to fetch the details");
    }

    const responseData = await response.json();
    return responseData.data.restaurantDetail;
  };

  const {data: results, isLoading} = useQuery(
    ["restaurantDetail"],
    getRestaurantDetails,
    {
      enabled: !!restaurantId,
    }
  );

  return {results, isLoading};
};
