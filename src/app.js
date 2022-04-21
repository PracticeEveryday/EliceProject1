// const exrpess = require("express");
import express from "express";
import passport from "passport";
import session from "express-session";
import googleOAuth from "./utils/googleOAuth";

import { indexRouter } from "./routes/indexRouter.js";
import { registerRouter } from "./routes/registerRouter.js";
import { loginRouter } from "./routes/loginRouter.js";
import { likeRouter } from "./routes/likeRouter.js";
import { refreshRouter } from "./routes/refreshRouter.js";
import { postRouter } from "./routes/postRouter.js";
import { awardRouter } from "./routes/awardRouter.js";
import { educationRouter } from "./routes/educationRouter.js";
import { projectRouter } from "./routes/projectRouter.js";

const app = express();

passport.use(googleOAuth);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// POST 요청 시 Body 사용을 위한 기본코드
// 폼형식을 허용해라
app.use(express.urlencoded({ extended: true }));
// json을 허용해라
app.use(express.json());
app.use(indexRouter);
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/error" }),
  function (req, res) {
    res.status(200).redirect("/");
  }
);
app.use(refreshRouter);

app.use(registerRouter);
app.use(loginRouter);
app.use(likeRouter);
app.use(postRouter);
app.use(awardRouter);
app.use(educationRouter);
app.use(projectRouter);

export { app };
