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

const refreshVerify = async (token, userId) => {
  /* redis 모듈은 기본적으로 promise를 반환하지 않으므로,
       promisify를 이용하여 promise를 반환하게 해줍니다.*/
  //const getAsync = promisify(redisClient.get).bind(redisClient);

  try {
    const data = await getAsync(userId); // refresh token 가져오기
    if (token === data) {
      try {
        jwt.verify(token, jwtKey);
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
