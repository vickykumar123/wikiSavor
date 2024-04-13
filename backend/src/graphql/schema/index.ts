import {buildSchema} from "graphql";
export const schema = buildSchema(`
type User{
    _id:String!
    auth0Id:String!
    email:String!
    name:String!
    addressLine1:String
    city:String
    country:String
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

type RootQuery{
    getCurrentUserInfo:User!
}

type RootMutation{
    createCurrentUser(currentUserInput:CurrentUserInput):User
    updateCurrentUser(updateUserInput:UpdateUserInput):User
}

schema{
    query:RootQuery,
    mutation:RootMutation
}

`);
