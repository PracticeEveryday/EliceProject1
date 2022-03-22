import { makeToken, verify, refreshVerify } from "../utils/makeToken.js";
import { Router } from "express";

import jwt from "jsonwebtoken";

const refreshRouter = Router();

refreshRouter.get("/refresh/getoken", async (req, res, next) => {
  if (req.headers["authorization"] && req.headers["refresh"]) {
    const authToken = req.headers.authorization.split(" ")[1];
    const refreshToken = req.headers["refresh"];

    const authResult = verify(authToken);
    const decoded = jwt.decode(authToken);

    if (decoded === null) {
      res.status(401).send({
        status: "false",
        message: "No authorized",
      });
    }

    const refreshResult = await refreshVerify(refreshToken);

    if (authResult.ok === false && authResult.message === "jwt expired") {
      if (refreshResult.ok === false) {
        res.status(401).send({
          status: "fail",
          message: "No authorized!",
        });
      } else {
        const { userId, ObjectId } = decoded;

        const newAccessToken = makeToken({ userId, ObjectId });

        res.status(200).send({
          status: "true",
          accessToken: newAccessToken,
          refreshToken,
        });
      }
    } else {
      res.status(400).send({
        status: "fail",
        message: "Access token is not expired!",
      });
    }
  } else {
    res.status(400).send({
      status: "fail",
      message: "Access token and refresh token are need for refresh!",
    });
  }
});

export { refreshRouter };
