import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];

  if (!token) {
    next();
  } else {
    const jwtKey = process.env.JWT_KEY;
    const decoded = jwt.verify(token, jwtKey);
    req.user = {
      userId: decoded.userId,
      ObjectId: decoded.ObjectId,
    };

    next();
  }
};

export { verifyToken };
