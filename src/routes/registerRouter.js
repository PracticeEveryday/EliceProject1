import { Router } from "express";

const registerRouter = Router();

registerRouter.post("/register", async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
  } catch (error) {
    next(error);
  }
});
