import jwt from "jsonwebtoken";

// import { promisify } from "util";

//import { redisClient } from "./redis.js";

import dotenv from "dotenv";

dotenv.config();

// jwt 토큰 키
const jwtKey = process.env.JWT_KEY;

const makeToken = (object) => {
  const payload = object;
  object = { userId: object.userId };

  const token = jwt.sign(payload, jwtKey, {
    // secret으로 sign하여 발급하고 return
    expiresIn: "1h", // 유효기간
  });

  return token;
};

const verify = (token) => {
  // access token 검증
  let decoded = null;
  try {
    decoded = jwt.verify(token, jwtKey);
    return {
      ok: true,
      userId: decoded.userId,
      // ObjectId: decoded.ObjectId,
    };
  } catch (err) {
    return {
      ok: false,
      message: err.message,
    };
  }
};

const refresh = () => {
  return jwt.sign({}, jwtKey, {
    // refresh token은 payload 없이 발급
    expiresIn: "14d",
  });
};

const refreshVerify = async (token) => {
  try {
    const verifyRefreshToken = verify(token, jwtKey);
    console.log("verifyRefreshToken", verifyRefreshToken);
    if (verifyRefreshToken) {
      try {
        return true;
      } catch (err) {
        return false;
      }
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};
export { makeToken, verify, refresh, refreshVerify };
