import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    message: {
      type: String,
    },
  },
  {timestamps: true}
);

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
