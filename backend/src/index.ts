import express from "express";
import "dotenv/config";
import expressPlayground from "graphql-playground-middleware-express";
import Server from "./classes/server";

import {WebSocket, WebSocketServer} from "ws";
let socket: WebSocket | null = null;
const wss = new WebSocketServer({port: 8080});
wss.on("connection", function connection(ws) {
  socket = ws;
  ws.on("open", function open() {
    console.log("Websocket openned");
  });

  //   ws.on("message", (data) => {
  //     const message = JSON.parse(data.toString())
  //   });
  ws.on("close", () => {
    console.log("Websocket Closed");
  });
});

const app = express();
const server = new Server(app);
server.config();
server.connect();
server.healthCheck();
app.get("/playground", expressPlayground({endpoint: "/graphql"}));
server.middleware();
server.stripeWebhook();
server.graphql();

export {socket};
