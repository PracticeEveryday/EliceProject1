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

awardRouter.put("/awards/:awardId", async (req, res, next) => {
  try {
    const userId = req.user.ObjectId;
    const awardId = req.params.awardId;
    const { title, description } = req.body;

    const modifiedAward = await awardService.modify({
      userId,
      awardId,
      title,
      description,
    });

    if (modifiedAward.errorMessage) {
      throw new Error(modifiedAward.errorMessage);
    }
    res.status(200).json(modifiedAward);
  } catch (error) {
    next(error);
  }
});

awardRouter.delete("/awards/:awardId", async (req, res, next) => {
  try {
    const awardId = req.params.awardId;
    const removedAward = await awardService.deleteAward({ awardId });

    if (removedAward.errorMessage) {
      throw new Error(removedAward.errorMessage);
    }

    res.status(200).json(removedAward);
  } catch (error) {
    next(error);
  }
});

export { awardRouter };
