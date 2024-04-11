import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import {createHandler} from "graphql-http/lib/use/express";
import expressPlayground from "graphql-playground-middleware-express";
import {schema} from "./graphql/schema";
import {resolver} from "./graphql/resolvers";

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

app.get("/playground", expressPlayground({endpoint: "/graphql"}));
app.use("/graphql", (req, res, next) =>
  createHandler({
    schema: schema,
    rootValue: resolver,
    context: {req, res},
  })(req, res, next)
);
