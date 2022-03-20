import { UserModel } from "./models/user.js";
import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

const MONGO_URL = process.env.MONGODB_URL || "URL이 틀립니다 ㅠ";

mongoose
  .connect(MONGO_URL)
  .then(() => console.log(`${MONGO_URL}에 연결 되었습니다`))
  .catch(() => {
    console.log("몬고디비 연결에 실패하였습니다.");
  });

export { UserModel };