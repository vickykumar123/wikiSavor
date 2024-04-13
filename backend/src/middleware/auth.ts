import {NextFunction, Request, Response} from "express";
import {auth} from "express-oauth2-jwt-bearer";
import jwt from "jsonwebtoken";
import User from "../models/user";
import client from "../redis/client";
import {currentUserKey} from "../redis/keys";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      auth0Id: string;
    }
  }
}

export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
});

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {authorization} = req.headers;

  if (!authorization || !authorization.startsWith("Bearer")) {
    return next();
  }

  const token = authorization?.split(" ")[1];
  try {
    let user;
    const decoded = jwt.decode(token!) as jwt.JwtPayload;
    const auth0Id = decoded?.sub;
    user = await client.get(currentUserKey(auth0Id!));
    if (user) {
      user = JSON.parse(user);
    } else {
      user = await User.findOne({auth0Id});
      await client.set(currentUserKey(auth0Id!), JSON.stringify(user));
    }

    if (!user) {
      throw new Error("User not found");
    }

    req.userId = user._id.toString();
    req.auth0Id = auth0Id!;
    next();
  } catch (err) {
    next();
  }
};
