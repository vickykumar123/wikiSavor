import {buildSchema} from "graphql";
export const schema = buildSchema(`
scalar MenuInputs
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
    name:String!
    price:Float!
}

type Restaurant{
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
type RootQuery{
    getCurrentUserInfo:User!
    deleteAccount:User!
    getCurrentUserRestaurant:Restaurant!
    searchRestaurant:SearchRestaurant
}

type RootMutation{
    createCurrentUser(currentUserInput:CurrentUserInput):User
    updateCurrentUser(updateUserInput:UpdateUserInput):User
    createUserRestaurant(restaurantInput:RestaurantInput):Restaurant
    updateCurrentUserRestaurant(restaurantInput:RestaurantInput):Restaurant
}

schema{
    query:RootQuery,
    mutation:RootMutation
}

`);
