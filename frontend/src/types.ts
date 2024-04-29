export type User = {
  _id?: string;
  email: string;
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};
export type MenuItem = {
  _id?: string;
  name: string;
  price: number;
};
export type Restaurant = {
  _id?: string;
  user?: string;
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: MenuItem[];
  imageUrl?: string;
  lastUpdated?: string;
};

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

export type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetail: {
    name: string;
    email: string;
    addressLine1: string;
    city: string;
    country: string;
  };
  restaurantId: string;
};

export type OrderStatus =
  | "placed"
  | "paid"
  | "inProgress"
  | "outForDelivery"
  | "delivered";

export type Order = {
  _id: string;
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
  status: OrderStatus;
  createdAt: string | Date;
};

export type UpdateOrderStatus = {
  orderId: string;
  status: OrderStatus;
};

export type Notification = {
  message: string;
  createdAt: Date;
};
