import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on ", PORT);
});
mongoose.connect(process.env.MONGO_DATABASE_URL!).then(() => {
  console.log("Mongo database connected");
});
