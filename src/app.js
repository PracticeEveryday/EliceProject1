// const exrpess = require("express");
import express from "express";

import { indexRouter } from "./routes/indexRouter.js";
import { registerRouter } from "./routes/registerRouter.js";
import { loginRouter } from "./routes/loginRouter.js";
import { likeRouter } from "./routes/likeRouter.js";
import { refreshRouter } from "./routes/refreshRouter.js";
import { postRouter } from "./routes/postRouter.js";

const app = express();

// POST 요청 시 Body 사용을 위한 기본코드
// 폼형식을 허용해라
app.use(express.urlencoded({ extended: true }));
// json을 허용해라
app.use(express.json());

app.use(refreshRouter);

app.use(indexRouter);
app.use(registerRouter);
app.use(loginRouter);
app.use(likeRouter);
app.use(postRouter);

export { app };
