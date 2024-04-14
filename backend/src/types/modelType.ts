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
interface Menu {
  name: string;
  price: string;
}

export interface Restaurant {
  user: User;
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: string;
  estimatedDeliveryTime: string;
  cuisines: string[];
  menuItems: Menu;
  imageUrl: string;
  lastUpdate: Date | string;
}
