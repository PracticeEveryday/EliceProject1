import { User } from "../schemas/user.js";

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

  static update = async (userId, newValue) => {
    const filter = { id: userId };

    const updateContent = newValue;
    console.log(updateContent);

    const option = { returnOriginal: false };

    const updatedUser = await User.findOneAndUpdate(
      filter,
      updateContent,
      option
    );
    console.log(updatedUser);
    return updatedUser;
  };

  static removeUser = async ({ userId }) => {
    await User.deleteOne({ id: userId });
  };

  // static hashPassword = (password) => {
  //   const hashedPassword = crypto
  //     .createHash("sha512")
  //     .update(password)
  //     .digest("hex");

  //   return hashedPassword;
  // };

  // static makeToken = (object) => {
  //   const jwtKey = process.env.JWT_KEY;
  //   const token = jwt.sign(object, jwtKey, { expiresIn: "24h" });

  //   return token;
  // };
}

export { UserModel };
