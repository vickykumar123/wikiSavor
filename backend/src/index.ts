import express, {Request, Response} from "express";
import "dotenv/config";
import {createHandler} from "graphql-http/lib/use/express";
import expressPlayground from "graphql-playground-middleware-express";
import {schema} from "./graphql/schema";
import {resolver} from "./graphql/resolvers";
import {jwtCheck, verifyUser} from "./middleware/auth";
import {upload} from "./lib/upload";
import {uploadSingle} from "./controller/uploadController";
import Server from "./classes/server";

const app = express();
const server = new Server(app);
server.config();
server.connect();

app.get("/health", async (req: Request, res: Response) => {
  res.send({message: "health OK!"});
});

app.get("/playground", expressPlayground({endpoint: "/graphql"}));
// Middlewares
app.use(jwtCheck);
app.use(verifyUser);
app.post("/upload-single", upload.single("image"), uploadSingle);
app.use("/graphql", (req, res, next) =>
  createHandler({
    schema: schema,
    rootValue: resolver,
    context: {req, res},
  })(req, res, next)
);
