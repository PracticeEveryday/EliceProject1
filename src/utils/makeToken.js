import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();

const makeToken = (object) => {
  const jwtKey = process.env.JWT_KEY;
  const token = jwt.sign(object, jwtKey, { expiresIn: "24h" });
  return token;
};

export { makeToken };
