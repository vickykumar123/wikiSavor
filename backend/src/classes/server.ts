import express, {Express, Request, Response} from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import {jwtChecker, verifyUser} from "../middleware/auth";
import {upload} from "../lib/upload";
import {uploadSingle} from "../controller/uploadController";
import {createHandler} from "graphql-http/lib/use/express";
import {schema} from "../graphql/schema";
import {resolver} from "../graphql/resolvers";
import {orderCheckoutWebhook} from "../controller/orderCheckout";

class Server {
  private app: Express;
  constructor(app: Express) {
    this.app = app;
  }

  config() {
    this.app.use("/api/order/checkout/webhook", express.raw({type: "*/*"}));
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
  middleware() {
    this.app.use(jwtChecker);
    this.app.use(verifyUser);
    this.app.post("/upload-single", upload.single("image"), uploadSingle);
  }
  graphql() {
    this.app.use("/graphql", (req, res, next) =>
      createHandler({
        schema: schema,
        rootValue: resolver,
        context: {req, res},
      })(req, res, next)
    );
  }

  healthCheck() {
    this.app.get("/health", async (req: Request, res: Response) => {
      res.send({message: "health OK!"});
    });
  }
  stripeWebhook() {
    this.app.post("/api/order/checkout/webhook", orderCheckoutWebhook);
  }
}

export default Server;
