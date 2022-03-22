import jwt from "jsonwebtoken";

import { verify } from "../utils/makeToken.js";
import dotenv from "dotenv";
dotenv.config();

const verifyToken = async (req, res, next) => {
  if (req.headers["authorization"]) {
    const token = req.headers["authorization"].split(" ")[1];
    const result = verify(token);
    if (result.status) {
      req.user = result;
      next();
    } else {
      res.status(401).send({
        status: "fail",
        message: result.message, // jwt가 만료되었다면 메세지는 'jwt expired'입니다.
      });
    }
  } else {
    res.status(401).json({
      status: "fali",
      message: "토큰이 존재하지 않습니다.",
    });
  }
};

export { verifyToken };
