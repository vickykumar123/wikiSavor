import {API_URL} from "@/lib/contants";
import {SearchState} from "@/pages/SearchPage";
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
