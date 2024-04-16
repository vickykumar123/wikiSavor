import express, {Express} from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

class Server {
  private app: Express;
  constructor(app: Express) {
    this.app = app;
  }

  config() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}));
    this.app.use(cors({origin: process.env.FRONTEND_URL, credentials: true}));
    this.app.use(cookieParser());
  }

  connect() {
    const PORT = process.env.PORT || 3000;
    this.app.listen(PORT, () => {
      console.log("Server is running on ", PORT);
    });
    mongoose
      .connect(process.env.MONGO_DATABASE_URL!)
      .then(() => {
        console.log("Mongo database connected");
      })
      .catch((error) => console.log(error));
  }
}

export default Server;
