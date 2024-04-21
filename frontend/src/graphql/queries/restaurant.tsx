import {fetchApi} from "@/lib/fetchApi";
import {useQuery} from "react-query";

export const useSearchRestaurant = (city?: string) => {
  const createSearchRequest = async () => {
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

    const response = await fetchApi(requestBody);
    if (!response.ok) {
      throw new Error("Unable to fetch the request");
    }
    const results = await response.json();
    return results.data.searchRestaurant;
  };
  const {data: results, isLoading} = useQuery(
    "searchRequest",
    createSearchRequest,
    {enabled: !!city}
  );
  return {results, isLoading};
};
