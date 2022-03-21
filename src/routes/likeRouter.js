import { Router } from "express";

import { likeService } from "../service/likeService.js";

import { verifyToken } from "../middleware/verifyToken.js";
import { checkLogin } from "../middleware/checkLogin.js";

const likeRouter = Router();

likeRouter.use(verifyToken);
likeRouter.use(checkLogin);

likeRouter.get("/like/pushLike", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

likeRouter.post("/like/backLike", async (req, res, next) => {
  try {
    const { likeId } = req.body;
    const deletedLike = await likeService.deleteLike({ likeId });
    if (deletedLike.errorMessage) {
      throw new Error(deletedLike.errorMessage);
    }

    res.status(200).json({
      status: "succ",
    });
  } catch (error) {
    next(error);
  }
});

export { likeRouter };
