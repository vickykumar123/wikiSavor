import {API_URL_IMAGE} from "@/lib/contants";
import {fetchApi} from "@/lib/fetchApi";
import {Restaurant, UpdateOrderStatus} from "@/types";
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
    reset,
  } = useMutation(updateCurrentUserRestaurant);

  if (isSuccess) {
    toast.success("Restaurant update!");
    reset();
  }
  if (isError) {
    toast.success("Restaurant not updated!");
    reset();
  }

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
    const response = await fetch(API_URL_IMAGE, {
      method: "POST",
      credentials: "include",
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

export const useGetCurrentUserRestaurantOrder = () => {
  const {getAccessTokenSilently} = useAuth0();
  const getCurrentUserOrder = async () => {
    const accessToken = await getAccessTokenSilently();
    const requestBody = {
      query: `query CurrentUserRestaurantOrder{
        currentUserRestaurantOrders{
          _id
          restaurant{
            restaurantName
          }
          deliveryDetails{
            name
            addressLine1
            city
            country
          }
          cartItems{
            name
            quantity
          }
          status
          totalAmount
          createdAt
        }
      }`,
    };

    const response = await fetchApi(requestBody, accessToken);
    if (!response.ok) {
      throw new Error("Unable to fetch the order");
    }
    const responseData = await response.json();
    return responseData.data.currentUserRestaurantOrders;
  };
  const {data: orders, isLoading} = useQuery(
    "fetchRestaurantOrder",
    getCurrentUserOrder
  );
  return {orders, isLoading};
};

export const useUpdateOrderStatus = () => {
  const {getAccessTokenSilently} = useAuth0();
  const updateOrderStatus = async (updateOrderStatus: UpdateOrderStatus) => {
    const accessToken = await getAccessTokenSilently();
    const requestBody = {
      query: `mutation UpdateOrderStatus($orderId:String!, $status:String!) {
        updateOrderStatus(orderId: $orderId, status: $status) {
          status
        }
      }`,
      variables: {
        orderId: updateOrderStatus.orderId,
        status: updateOrderStatus.status,
      },
    };
    const response = await fetchApi(requestBody, accessToken);
    if (!response.ok) {
      throw new Error("Unable to update restaurant status");
    }
    const responseData = await response.json();
    return responseData.data.updateOrderStatus;
  };
  const {
    mutateAsync: updateRestaurantStatus,
    isLoading,
    isError,
    isSuccess,
    reset,
  } = useMutation(updateOrderStatus);
  if (isSuccess) {
    toast.success("Updated the order status");
  }
  if (isError) {
    toast.error("Unable to update the status");
    reset();
  }

  return {updateRestaurantStatus, isLoading};
};

export const useDeliveredOrder = () => {
  const {getAccessTokenSilently} = useAuth0();
  const deliveredOrder = async () => {
    const accessToken = await getAccessTokenSilently();
    const requestBody = {
      query: `query DeliveredOrder{
        deliveredOrdered{
          _id
          deliveryDetails{
            name,
            addressLine1,
            city,
            country
          }
          totalAmount
          status
          cartItems{
            menuItemsId
            name
            quantity
          }
          createdAt
        }
      }`,
    };
    const response = await fetchApi(requestBody, accessToken);
    if (!response.ok) {
      throw new Error("Unable to fetch delivered details");
    }
    const responseData = await response.json();
    return responseData.data.deliveredOrdered;
  };

  const {data: deliveredResult, isLoading} = useQuery(
    "deliveredOrder",
    deliveredOrder
  );
  return {deliveredResult, isLoading};
};
