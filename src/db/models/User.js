import { User } from "../schemas/user.js";

import crypto from "crypto";
// console.log("User static", User.setPassword);

// const user = new User();
// console.log("user instance", user.hashPassword);

import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();

class UserModel {
  static create = async (newUserData) => {
    const createdUser = await User.create(newUserData);
    return createdUser;
  };

  static findByEmail = async ({ email }) => {
    const user = await User.findOne({ email });
    return user;
  };

  static findById = async ({ userId }) => {
    const user = await User.findOne({ id: userId });
    return user;
  };

  static update = async (userId, updateFilter, newValue) => {
    const filter = { id: userId };
    const updateContent = { [updateFilter]: newValue };
    const option = { returnOriginal: false };

    const updatedUser = await User.findOneAndUpdate(
      filter,
      updateContent,
      option
    );
    return updatedUser;
  };

  static removeUser = async ({ userId }) => {
    await User.deleteOne({ id: userId });
  };

  static hashPassword = (password) => {
    const hashedPassword = crypto
      .createHash("sha512")
      .update(password)
      .digest("hex");

    return hashedPassword;
  };

  static makeToken = (object) => {
    const jwtKey = process.env.JWT_KEY;
    const token = jwt.sign(object, jwtKey, { expiresIn: "24h" });
    return token;
  };
}

export { UserModel };
