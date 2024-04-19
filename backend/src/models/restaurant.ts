import mongoose from "mongoose";
import {Restaurant as RestaurantType} from "../types/modelType";

const menuItemSchema = new mongoose.Schema({
  name: {type: String, required: [true, "Menu name is required"]},
  price: {type: Number, required: [true, "Menu price is required"]},
});

const restaurantSchema = new mongoose.Schema<RestaurantType>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    restaurantName: {
      unique: true,
      type: String,
      require: [true, "RestaurantName is required"],
    },
    city: {
      type: String,
      require: [true, "City is required"],
    },
    country: {
      type: String,
      require: [true, "Country is required"],
    },
    deliveryPrice: {
      type: Number,
      require: [true, "Delivery Price is required"],
    },
    estimatedDeliveryTime: {
      type: Number,
      require: [true, "Time is required"],
    },
    cuisines: [{type: String, required: [true, "Cuisined is Requried"]}],
    menuItems: [menuItemSchema],
    imageUrl: {type: String, require: [true, "Image url is required"]},
    lastUpdate: {type: Date, required: true},
  },
  {
    timestamps: true,
  }
);

restaurantSchema.index({estimatedDeliveryTime: 1});

const Restaurant = mongoose.model<RestaurantType>(
  "Restaurant",
  restaurantSchema
);

export default Restaurant;
