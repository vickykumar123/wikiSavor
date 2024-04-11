import {API_URL} from "./contants";

export const fetchApi = async (requestBody: {
  query: string;
  variables?: any;
}) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }
  return response;
};
