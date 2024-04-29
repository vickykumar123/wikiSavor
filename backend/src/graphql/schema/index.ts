import {buildSchema} from "graphql";
export const schema = buildSchema(`
scalar MenuInputs
scalar CartItem
scalar DeliveryDetailsInput
type User{
    _id:String!
    auth0Id:String!
    email:String!
    name:String!
    addressLine1:String
    city:String
    country:String
}

type Menu{
    _id:String!
    name:String!
    price:Float!
}

type Restaurant{
    _id:String!
    user: User!
  restaurantName: String!
  city: String!
  country: String!
  deliveryPrice: Float!
  estimatedDeliveryTime: Float!
  cuisines: [String]!
  menuItems: [Menu]!
  imageUrl: String
  lastUpdate: String
}

type Pagination{
    total:Int
    page:Int
    pages:Int
}

type SearchRestaurant{
    data: [Restaurant]
    pagination:Pagination
}

type Checkout{
    url:String
}

type CartItems{
    menuItemsId:String
    quantity:String
    name:String
}

type Order{
    _id:String
    restaurant:Restaurant
    user:User
    deliveryDetails:User
    cartItems:[CartItems]
    totalAmount:Float
    status:String
    createdAt:String
}

type Notification{
    message:String
    createdAt:String
}

input CurrentUserInput{
    auth0Id:String!
    email:String!
    name:String!
}

input UpdateUserInput{
    name:String!
    addressLine1:String!
    city:String!
    country:String!
}


input RestaurantInput{
    restaurantName: String!
    city: String!
    country: String!
    deliveryPrice: Float!
    estimatedDeliveryTime: Float!
    cuisines: [String]!
    menuItems: [MenuInputs]
    imageUrl: String
    lastUpdate: String
}

input CheckoutInput{
    cartItems:[CartItem]
    deliveryDetail:DeliveryDetailsInput
    restaurantId:String!
}
type RootQuery{
    getCurrentUserInfo:User!
    deleteAccount:User!
    getCurrentUserRestaurant:Restaurant!
    searchRestaurant(city:String):SearchRestaurant
    restaurantDetail(restaurantId:String!):Restaurant
    getCurrentUserOrder:[Order]
    currentUserRestaurantOrders:[Order]
    deliveredOrdered:[Order]
    getNotification:[Notification]
}

type RootMutation{
    createCurrentUser(currentUserInput:CurrentUserInput):User
    updateCurrentUser(updateUserInput:UpdateUserInput):User
    createUserRestaurant(restaurantInput:RestaurantInput):Restaurant
    updateCurrentUserRestaurant(restaurantInput:RestaurantInput):Restaurant
    createCheckoutSession(checkout:CheckoutInput):Checkout
    updateOrderStatus(orderId:String!, status:String!):Order
}

schema{
    query:RootQuery,
    mutation:RootMutation
}

`);
