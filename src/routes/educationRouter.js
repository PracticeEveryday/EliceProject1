import { Router } from "express";
import { educationService } from "../service/educationService";

const educationRouter = Router();

educationRouter.get("/education", (req, res, next) => {
  res.json({
    status: "succ",
  });
});

export { educationRouter };
