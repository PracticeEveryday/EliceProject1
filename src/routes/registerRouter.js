import { Router } from "express";

import { registerService } from "../service/registerService.js";

const registerRouter = Router();

registerRouter.post("/register", async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
  } catch (error) {
    next(error);
  }
});

export { registerRouter };
