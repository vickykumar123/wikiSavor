import {Request, Response} from "express";
import User from "../../models/user";
import {User as UserType} from "../../types/modelType";
import client from "../../redis/client";

export const resolver = {
  createCurrentUser: async (
    {currentUserInput}: {currentUserInput: UserType},
    context: {req: Request; res: Response}
  ) => {
    try {
      const {auth0Id, email, name} = currentUserInput;
      const existingUser = await User.findOne({auth0Id});
      if (existingUser) {
        return existingUser;
      }
      const newUser = await User.create({
        auth0Id,
        email,
        name,
      });
      return newUser;
    } catch (error) {
      throw new Error(error as string);
    }
  },
};
