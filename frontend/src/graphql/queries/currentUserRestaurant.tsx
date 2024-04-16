import {fetchApi} from "@/lib/fetchApi";
import {Restaurant} from "@/types";
import {useAuth0} from "@auth0/auth0-react";
import {useMutation, useQuery} from "react-query";
import {toast} from "sonner";

export const useGetCurrentUserRestaurant = () => {
  const {getAccessTokenSilently} = useAuth0();
  const getCurrentUserRestaurant = async (): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    const requestBody = {
      query: `query GetCurrentUserRestaurant{
        getCurrentUserRestaurant{
           restaurantName
          city
          country
          deliveryPrice
          estimatedDeliveryTime
          cuisines
          menuItems{
            name
            price
          }
          imageUrl 
        }
      }`,
    };

    const response = await fetchApi(requestBody, accessToken);
    if (!response.ok) {
      throw new Error("Unable to fetch the infomation");
    }
    const responseData = response.json();
    // @ts-ignore

    return responseData;
  };

  const {data: restaurantData, isLoading} = useQuery(
    "getCurrentUserRestaurant",
    getCurrentUserRestaurant
  );

  return {restaurantData, isLoading};
};

export const useCreateCurrentUserRestaurant = () => {
  const {getAccessTokenSilently} = useAuth0();
  const createCurrentUserRestaurant = async (
    restaurantFormData: Restaurant
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    const requestBody = {
      query: `mutation CreateRestaurant($restaurantName: String!,
$city: String!,$country: String!,$deliveryPrice: Float!,
$estimatedDeliveryTime: Float!,$cuisines: [String]!,$menuItems:[MenuInputs],$imageUrl: String){
        createUserRestaurant(restaurantInput:{
          restaurantName:$restaurantName,
          city:$city,
          country:$country,
          deliveryPrice:$deliveryPrice,
          estimatedDeliveryTime:$estimatedDeliveryTime,
          cuisines:$cuisines,
          menuItems:$menuItems,
          imageUrl:$imageUrl,
        }){
          restaurantName
          city
          country
          deliveryPrice
          estimatedDeliveryTime
          cuisines
          menuItems{
            name
            price
          }
          imageUrl
        }
      }`,
      variables: {
        restaurantName: restaurantFormData.restaurantName,
        city: restaurantFormData.city,
        country: restaurantFormData.country,
        deliveryPrice: restaurantFormData.deliveryPrice,
        estimatedDeliveryTime: restaurantFormData.estimatedDeliveryTime,
        cuisines: restaurantFormData.cuisines,
        menuItems: restaurantFormData.menuItems,
        imageUrl: restaurantFormData.imageUrl,
      },
    };

    const response = await fetchApi(requestBody, accessToken);
    if (!response.ok) {
      throw new Error("Unable to submit create restaurant form");
    }

    return response.json();
  };
  const {
    mutate: createRestaurant,
    isLoading,
    isSuccess,
    isError,
  } = useMutation(createCurrentUserRestaurant);

  if (isSuccess) toast.success("Restaurant created!");
  if (isError) toast.success("Restaurant not created!");

  return {createRestaurant, isLoading};
};

export const useUpdateCurrentUserRestaurant = () => {
  const {getAccessTokenSilently} = useAuth0();
  const updateCurrentUserRestaurant = async (
    restaurantFormData: Restaurant
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    console.log(restaurantFormData.imageUrl);
    const requestBody = {
      query: `mutation UpdateRestaurant($restaurantName: String!,
$city: String!,$country: String!,$deliveryPrice: Float!,
$estimatedDeliveryTime: Float!,$cuisines: [String]!,$menuItems:[MenuInputs],$imageUrl: String){
  updateCurrentUserRestaurant(restaurantInput:{
          restaurantName:$restaurantName,
          city:$city,
          country:$country,
          deliveryPrice:$deliveryPrice,
          estimatedDeliveryTime:$estimatedDeliveryTime,
          cuisines:$cuisines,
          menuItems:$menuItems,
          imageUrl:$imageUrl,
        }){
          restaurantName
          city
          country
          deliveryPrice
          estimatedDeliveryTime
          cuisines
          menuItems{
            name
            price
          }
          imageUrl
        }
      }`,
      variables: {
        restaurantName: restaurantFormData.restaurantName,
        city: restaurantFormData.city,
        country: restaurantFormData.country,
        deliveryPrice: restaurantFormData.deliveryPrice,
        estimatedDeliveryTime: restaurantFormData.estimatedDeliveryTime,
        cuisines: restaurantFormData.cuisines,
        menuItems: restaurantFormData.menuItems,
        imageUrl: restaurantFormData.imageUrl,
      },
    };

    const response = await fetchApi(requestBody, accessToken);
    if (!response.ok) {
      throw new Error("Unable to submit create restaurant form");
    }

    return response.json();
  };
  const {
    mutate: updateRestaurant,
    isLoading,
    isSuccess,
    isError,
  } = useMutation(updateCurrentUserRestaurant);

  if (isSuccess) toast.success("Restaurant update!");
  if (isError) toast.success("Restaurant not updated!");

  return {updateRestaurant, isLoading};
};

export const useUploadImage = () => {
  const {getAccessTokenSilently} = useAuth0();
  const uploadImage = async (image: any) => {
    if (!image) {
      console.log("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    const accessToken = await getAccessTokenSilently();
    const response = await fetch("http://localhost:3000/upload-single", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });
    const responseData = await response.json();
    return responseData.image;
  };

  const {
    mutateAsync: uploadImageMutate,
    isLoading,
    isError,
  } = useMutation(uploadImage);

  if (isError) toast.error("Unable to upload the image, try after sometime.");
  return {uploadImageMutate, isLoading};
};
