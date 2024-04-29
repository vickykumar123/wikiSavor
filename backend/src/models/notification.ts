import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  message: {
    type: String,
  },
  createdAt: {type: Date},
});

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
