import mongoose from "mongoose";
import {User} from "../types/modelType";

const userSchema = new mongoose.Schema(
  {
    auth0Id: {
      type: String,
      required: [true, "auth0Id is required"],
    },
    email: {
      unique: true,
      type: String,
      required: [true, "email is required"],
    },
    name: {
      type: String,
      required: [true, "name is required"],
    },
    addressLine1: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  {timestamps: true}
);

const User = mongoose.model<User>("User", userSchema);
export default User;
