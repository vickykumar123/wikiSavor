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
export interface Menu {
  name: string;
  price: Number;
}

export interface Restaurant {
  user: User;
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: Menu;
  imageUrl: string;
  lastUpdate: Date | string;
}
