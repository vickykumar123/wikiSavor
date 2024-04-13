import {API_URL} from "./contants";

export const fetchApi = async (
  requestBody: {
    query: string;
    variables?: any;
  },
  accessToken?: string
) => {
  const response = await fetch(API_URL, {
    method: "POST",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${accessToken || ""}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  return response;
};
