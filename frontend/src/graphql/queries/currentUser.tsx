import {toast} from "sonner";
import {useMutation, useQuery} from "react-query";
import {fetchApi} from "@/lib/fetchApi";
import {useAuth0} from "@auth0/auth0-react";
import {User} from "@/types";

type CreateUserQuery = {
  auth0Id: string;
  email: string;
  name: string;
};

type UpdateCurrentUserRequest = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

export const useGetCurrentUser = () => {
  const {getAccessTokenSilently} = useAuth0();
  const getCurrentUser = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently();
    const requestbody = {
      query: `query GetUserInfo{
        getCurrentUserInfo{
          email
          name
          addressLine1
          city
          country
        }
      }`,
    };

    const response = await fetchApi(requestbody, accessToken);
    if (!response.ok) {
      throw new Error("Unable to get user info");
    }
    const responseData = await response.json();
    return responseData.data.getCurrentUserInfo;
  };

  const {data: currentUserData, isLoading} = useQuery(
    "getCurrentUserInfo",
    getCurrentUser
  );

  return {currentUserData, isLoading};
};

export const useCreateUser = () => {
  const {getAccessTokenSilently} = useAuth0();
  const createCurrentUser = async (user: CreateUserQuery) => {
    const accessToken = await getAccessTokenSilently();
    const requestBody = {
      query: `mutation CreateCurrentUser($auth0Id:String!,$email:String!,$name:String!){
        createCurrentUser(currentUserInput:{auth0Id:$auth0Id,email:$email,name:$name}){
           _id
          auth0Id
          email
          name
        }
      }`,
      variables: {
        auth0Id: user.auth0Id,
        email: user.email,
        name: user.name,
      },
    };

    const response = await fetchApi(requestBody, accessToken);
    if (!response.ok) {
      throw new Error("Failed to create user");
    }
  };

  const {mutateAsync: createUser, isLoading} = useMutation(createCurrentUser);
  return {createUser, isLoading};
};

export const useUpdateMyUser = () => {
  const {getAccessTokenSilently} = useAuth0();
  const updateCurrentUserRequest = async (
    formData: UpdateCurrentUserRequest
  ) => {
    const accessToken = await getAccessTokenSilently();
    const requestBody = {
      query: `mutation UpdateCurrentUser($name:String!,$addressLine1:String!, $city:String!, $country:String!){
        updateCurrentUser(updateUserInput:{name:$name,addressLine1:$addressLine1,
        city:$city,
          country:$country
        }){
          name
          addressLine1
          country
          city
        }
        }`,
      variables: {
        name: formData.name,
        addressLine1: formData.addressLine1,
        city: formData.city,
        country: formData.country,
      },
    };

    const response = await fetchApi(requestBody, accessToken);
    if (!response.ok) {
      throw new Error("Unable to update user data");
    }
  };

  const {
    mutateAsync: updateUser,
    isLoading,
    isError,
    isSuccess,
    reset,
  } = useMutation(updateCurrentUserRequest);

  if (isSuccess) {
    toast.success("User profile updated!");
  }
  if (isError) {
    toast.error("Unable to update the profile, Please try again!");
    reset();
  }

  return {
    updateUser,
    isLoading,
  };
};

export const useDeleteCurrentUser = () => {
  const {getAccessTokenSilently} = useAuth0();
  const deleteCurrentUser = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently();
    const requestbody = {
      query: `query DeleteCurrentUser{
        deleteAccount{
          _id
          email
        } 
      }`,
    };

    const response = await fetchApi(requestbody, accessToken);
    if (!response.ok) {
      throw new Error("Unable to get user info");
    }
    const responseData = await response.json();
    return responseData.data.deleteAccount;
  };

  const {
    data: currentUserData,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = useQuery("deleteCurrentUser", deleteCurrentUser, {
    refetchOnWindowFocus: false,
    enabled: false, // disable this query from automatically running
  });
  if (isSuccess)
    toast.success(
      "Deleted the account successfully, Will meet you again soon!!"
    );
  if (isError) toast.error("Something went wrong, Please try again later!!");

  return {currentUserData, isLoading, refetch};
};
