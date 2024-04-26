import express from "express";
import "dotenv/config";
import expressPlayground from "graphql-playground-middleware-express";
import Server from "./classes/server";

const app = express();
const server = new Server(app);
server.config();
server.connect();
server.healthCheck();
app.get("/playground", expressPlayground({endpoint: "/graphql"}));
server.middleware();
server.stripeWebhook();
server.graphql();
