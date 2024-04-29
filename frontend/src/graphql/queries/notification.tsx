import {fetchApi} from "@/lib/fetchApi";
import {Notification} from "@/types";
import {useAuth0} from "@auth0/auth0-react";
import {useQuery} from "react-query";

export const useGetNotification = () => {
  const {getAccessTokenSilently} = useAuth0();
  const getNotification = async (): Promise<Notification[]> => {
    const accessToken = await getAccessTokenSilently();
    const requestBody = {
      query: `query Notification{
        getNotification{
          message,
          createdAt
        }
      }`,
    };
    const response = await fetchApi(requestBody, accessToken);
    if (!response.ok) {
      throw new Error("Unable to fetch notification");
    }
    const responseBody = await response.json();
    return responseBody.data.getNotification;
  };
  const {
    data: notifications,
    isLoading,
    refetch,
  } = useQuery("getNotification", getNotification);
  return {notifications, isLoading, refetch};
};
