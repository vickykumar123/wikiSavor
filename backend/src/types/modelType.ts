export interface User {
  _id: string;
  auth0Id: string;
  email: string;
  name: string;
  addressLine1?: string;
  city?: string;
  country?: string;
  createdAt?: string;
}
