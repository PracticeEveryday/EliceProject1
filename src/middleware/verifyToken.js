import jwt from "jsonwebtoken";

import { verify } from "../utils/makeToken.js";
import dotenv from "dotenv";
dotenv.config();

const verifyToken = (req, res, next) => {
  if (req.headers["authorization"]) {
    const token = req.headers["authorization"].split(" ")[1];
    const result = verify(token);
    if (result.ok) {
      req.user = result.userId;
      next();
    }
  } else {
    res.status(401).send({
      ok: false,
      message: result.message, // jwt가 만료되었다면 메세지는 'jwt expired'입니다.
    });
  }
};

export { verifyToken };
