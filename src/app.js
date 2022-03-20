// const exrpess = require("express");
import express from "express";

import { indexRouter } from "./routes/indexRouter.js";
import { registerRouter } from "./routes/registerRouter.js";

const app = express();

app.use(indexRouter);
app.use(registerRouter);

export { app };
