const GoogleStrategy = require("passport-google-oauth20").Strategy;
import { UserModel } from "../db";
import { v4 as uuidv4 } from "uuid";
const config = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/google/callback",
};

const findOrCreateUser = async ({ name, email }) => {
  const user = await UserModel.findByEmail({ email });
  if (user) return user;
  const id = uuidv4();
  const newUser = await UserModel.create({
    id,
    name,
    email,
    password: "GOOGLE_OAUTH",
  });

  return newUser;
};

module.exports = new GoogleStrategy(
  config,
  async (accessToken, refreshToken, profile, done) => {
    const { name, email } = profile._json;
    try {
      const user = await findOrCreateUser({ name, email });
      done(null, user);
    } catch (e) {
      done(e, null);
    }
  }
);
