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

export { awardRouter };
