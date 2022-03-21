//import { Schema } from "mongoose";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      default: "description 추가하지 않았습니다.",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.hashPassword = function (password) {
  const hashedPassword = crypto
    .createHash("sha512")
    .update(password)
    .digest("hex");

  return hashedPassword;
};

userSchema.statics.setPassword = function (password) {
  const crypto = password + "123456789";
  this.cryptoPassword = crypto;
};
const User = mongoose.model("User", userSchema);

export { User };
