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
      throw new Error("Error in creating the user.");
    }
  },

  updateCurrentUser: async (
    {
      updateUserInput,
    }: {
      updateUserInput: any;
    },
    context: {req: Request; res: Response}
  ) => {
    try {
      const {req, res} = context;
      if (!req.userId) {
        throw new Error("Unauthorized");
      }
      const {name, addressLine1, city, country} = updateUserInput;
      if (updateUserInput.email) {
        throw new Error("Email can't be updated.");
      }
      if (!addressLine1 || !city || !country || !name) {
        throw new Error("Invalid inputs");
      }

      const currentUser = await User.findById(req.userId);
      if (!currentUser) {
        throw new Error("User not found");
      }

      currentUser.name = name;
      currentUser.addressLine1 = addressLine1;
      currentUser.city = city;
      currentUser.country = country;
      await currentUser.save();

      return currentUser;
    } catch (error) {
      // throw new Error("Error in updating user.");
      throw new Error(error as string);
    }
  },
};
