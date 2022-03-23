import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();

const jwtKey = process.env.JWT_KEY;

const makeToken = ({ userId, ObjectId }) => {
  const payload = { userId, ObjectId };

  const token = jwt.sign(payload, jwtKey, {
    expiresIn: "1h",
  });

  return token;
};

const verify = (token) => {
  let decoded = null;
  try {
    decoded = jwt.verify(token, jwtKey);
    return {
      status: "succ",
      userId: decoded.userId,
      ObjectId: decoded.ObjectId,
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
    expiresIn: "14d",
  });
};

const refreshVerify = async (refreshToken) => {
  try {
    const verifyRefreshToken = await verify(refreshToken, jwtKey);
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
