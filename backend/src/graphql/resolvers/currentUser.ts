import {Request, Response} from "express";
import User from "../../models/user";
import {User as UserType} from "../../types/modelType";
import client from "../../redis/client";
import {currentUserKey, currentUserNotification} from "../../redis/keys";
import {createNotification} from "../../lib/notification/createNotification";

export const currentUser = {
  // Create User
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
  // Update User
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

      await createNotification("Updatad the profile", req.userId.toString());
      await client.del(currentUserKey(req.auth0Id));
      return currentUser;
    } catch (error) {
      throw new Error("Error in updating user.");
      // throw new Error(error as string);
    }
  },

  // Get user info
  getCurrentUserInfo: async (
    _: any,
    context: {req: Request; res: Response}
  ) => {
    try {
      const {req, res} = context;
      if (!req.userId) {
        throw new Error("Unauthorized");
      }
      const userFromCache = await client.get(currentUserKey(req.auth0Id));
      if (userFromCache) {
        return JSON.parse(userFromCache);
      }

      const currentUser = await User.findById(req.userId);
      await client.set(
        currentUserKey(currentUser?.auth0Id!),
        JSON.stringify(currentUser)
      );
      return currentUser;
    } catch (error) {
      console.log(error);
      throw new Error("Unable to get user info");
    }
  },

  // Delete Current User,

  deleteAccount: async (_: any, context: {req: Request; res: Response}) => {
    try {
      const {req, res} = context;
      if (!req.userId) {
        throw new Error("Unauthorized");
      }
      const deleteUser = await User.findByIdAndDelete(req.userId);
      await client.del(currentUserKey(req.auth0Id));
      console.log("User Deleted");
      return deleteUser;
    } catch (error) {
      throw new Error("Unable to delete the user");
    }
  },
};
