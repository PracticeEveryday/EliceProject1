import { Router } from "express";

import { awardService } from "../service/awardService.js";

import { verifyToken } from "../middleware/verifyToken.js";
import { checkLogin } from "../middleware/checkLogin.js";

const awardRouter = Router();

awardRouter.use(verifyToken);
awardRouter.use(checkLogin);

awardRouter.get("/award", (req, res, next) => {
  res.json({
    status: "succ",
  });
});

awardRouter.post("/award/create", async (req, res, next) => {
  try {
    const userId = req.user.ObjectId;
    const { title, description } = req.body;
    const newAward = await awardService.create({ userId, title, description });

    res.status(200).json(newAward);
  } catch (error) {
    next(error);
  }
});

export { awardRouter };
