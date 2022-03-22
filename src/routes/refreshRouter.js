/*
  우리의 시나리오 
  access token이 만료되고, refresh token도 만료 된 경우 => 새로 로그인해야합니다.
  access token이 만료되고, refresh token은 만료되지 않은 경우 => 새로운 access token을 발급합니다.
  access token이 만료되지 않은경우 => refresh 할 필요가 없습니다.
 */

import { makeToken, verify, refreshVerify } from "../utils/makeToken.js";
import { Router } from "express";

import jwt from "jsonwebtoken";

const refreshRouter =
  ("/refresh",
  async (req, res, next) => {
    //console.log(req.headers["authorization"], req.headers["refresh"]);

    if (req.headers["authorization"] && req.headers["refresh"]) {
      const authToken = req.headers.authorization.split(" ")[1];
      const refreshToken = req.headers["refresh"];
      console.log("req.user", req.user);
      const authResult = verify(authToken);
      const decoded = jwt.decode(authToken);
      console.log("authResult", authResult, "decoded", decoded);

      if (decoded === null) {
        res.status(401).send({
          status: "false",
          message: "No authorized",
        });
      }

      /* access token의 decoding 된 값에서
      유저의 id를 가져와 refresh token을 검증합니다. */
      const refreshResult = await refreshVerify(refreshToken);
      console.log(refreshResult);

      if (authResult.ok === false && authResult.message === "jwt expired") {
        if (refreshResult.ok === false) {
          res.status(401).send({
            status: "fail",
            message: "No authorized!",
          });
        } else {
          const newAccessToken = sign(req.user);

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
