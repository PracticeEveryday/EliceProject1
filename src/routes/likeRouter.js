import { Router } from "express";

import { likeService } from "../service/likeService.js";

import { verifyToken } from "../middleware/verifyToken.js";
import { checkLogin } from "../middleware/checkLogin.js";

const likeRouter = Router();

likeRouter.use(verifyToken);
likeRouter.use(checkLogin);

likeRouter.post("/like/upLike", async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const ObjectId = req.user.ObjectId;
    console.log("라이크라우터에서 리크유저", req.user);
    console.log(userId, ObjectId);
    // console.log("userId ", userId);
    // const { userId } = req.body;
    // console.log(userId);
    const likedUser = await likeService.addLike({ userId, ObjectId });
    res.status(200).json(likedUser);
  } catch (error) {
    next(error);
  }
});

export { likeRouter };
