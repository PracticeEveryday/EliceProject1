import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  // console.log(token);
  if (!token) {
    next();
  } else {
    const jwtKey = process.env.JWT_KEY;
    const decoded = jwt.verify(token, jwtKey);
    //console.log("decoded", decoded.userId);
    req.user = {
      userId: decoded.userId,
      ObjectId: decoded.ObjectId,
    };
    //console.log("버리파이에서 리크유저", req.user);

    // console.log(decoded);
    next();
  }
};

export { verifyToken };
