// const exrpess = require("express");
import express from "express";

import { indexRouter } from "./routes/indexRouter.js";

const app = express();

app.use(indexRouter);

export { app };
