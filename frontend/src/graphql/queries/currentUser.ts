import {fetchApi} from "@/lib/fetchApi";
import {useAuth0} from "@auth0/auth0-react";
import {useMutation} from "react-query";

type CreateUserQuery = {
  auth0Id: string;
  email: string;
  name: string;
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
  };

  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createCurrentUser);

  return {createUser, isLoading, isError, isSuccess};
};
