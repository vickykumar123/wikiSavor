import {fetchApi} from "@/lib/fetchApi";
import {CheckoutSessionRequest} from "@/types";
import {useAuth0} from "@auth0/auth0-react";
import {useMutation} from "react-query";
import {toast} from "sonner";

export const useCreateCheckoutSession = () => {
  const {getAccessTokenSilently} = useAuth0();
  const createCheckoutSession = async (
    checkSessionRequest: CheckoutSessionRequest
  ) => {
    const accessToken = await getAccessTokenSilently();
    const requestBody = {
      query: `mutation CheckoutSession($cartItem: [CartItem], $restaurantId: String!) {
        createCheckoutSession(
          checkout: {
            cartItems:$cartItem
            restaurantId:$restaurantId
          }
        ) {
          url
        }
      }`,
      variables: {
        cartItem: checkSessionRequest.cartItems,
        restaurantId: checkSessionRequest.restaurantId,
      },
    };

    const response = await fetchApi(requestBody, accessToken);
    if (!response.ok) {
      throw new Error("Unable to create the checkout session");
    }
    const responseData = await response.json();
    return responseData.data.createCheckoutSession;
  };

  const {
    mutateAsync: createCheckSession,
    isLoading,
    isError,
    reset,
  } = useMutation(createCheckoutSession);

  if (isError) {
    toast.error("Unable to create the checkout session");
  }

  return {createCheckSession, isLoading, reset};
};
