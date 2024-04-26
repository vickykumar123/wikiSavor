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
  _id: string;
  name: string;
  price: number;
}

export interface Restaurant {
  user: User;
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: Menu[];
  imageUrl: string;
  lastUpdate: Date | string;
}

export interface Order {
  restaurant: Restaurant;
  user: User;
  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
    country: string;
  };
  cartItems: {
    menuItemsId: string;
    quantity: string;
    name: string;
  }[];
  totalAmount: number;
  status: "placed" | "paid" | "inProgress" | "outForDelivery" | "delivered";
  createdAt: string | Date;
}
