import {buildSchema} from "graphql";
export const schema = buildSchema(`
type User{
    _id:String!
    auth0Id:String!
    email:String!
    name:String!
}



input CurrentUserInput{
    auth0Id:String!
    email:String!
    name:String!
}

type RootQuery{
    User:[User!]
}

type RootMutation{
    createCurrentUser(currentUserInput:CurrentUserInput):User
}

schema{
    query:RootQuery,
    mutation:RootMutation
}

`);
