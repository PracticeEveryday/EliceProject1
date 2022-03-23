import { Router } from "express";

import { likeService } from "../service/likeService.js";

import { verifyToken } from "../middleware/verifyToken.js";
import { checkLogin } from "../middleware/checkLogin.js";

const likeRouter = Router();

likeRouter.use(verifyToken);
likeRouter.use(checkLogin);

likeRouter.post("/like/pushLike", async (req, res, next) => {
  try {
    const pushUser = req.user.ObjectId;
    const pushedUser = req.body.pushedUser;

    const likedUser = await likeService.addLike({
      pushUser,
      pushedUser,
    });
    if (likedUser.errorMessage) {
      throw new Error(likedUser.errorMessage);
    }
    res.status(200).json(likedUser);
  } catch (error) {
    res.status(404).json({
      status: "fail",
      errorMessage: "이미 해당 게시물에 좋아요를 누르셨습니다.",
    });
    next(error);
  }
});

likeRouter.post("/like/backLike", async (req, res, next) => {
  try {
    const likeId = req.body;
    console.log(likeId);
    const deletedLike = await likeService.deleteLike(likeId);
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

likeRouter.get("/likes", async (req, res, next) => {
  try {
    const pushUser = req.user.ObjectId;
    console.log(pushUser);
    const likes = await likeService.likes({ pushUser });
    // console.log("likes", likes);
    res.status(200).json({
      status: "succ",
      message: `내가 누른 좋아요 개수는 ${
        likes.length
      }개 입니다.그 유저 이름은 ${likes.map((item) => item.pushedUser)}입니다.`,
    });
  } catch (error) {
    next(error);
  }
});

likeRouter.get("/likes/user", async (req, res, next) => {
  try {
    const pushUser = req.user.ObjectId;

    const likedUser = await likeService.likedUsers({ pushUser });
    // console.log(likedUser);
    // console.log("likes", likes);
    res.status(200).json({
      status: "succ",
      message: `${likedUser[0].pushUser.name}가 누른 좋아요 개수는 ${
        likedUser.length
      }개 입니다.그 유저 이름은 ${likedUser.map((item) => {
        return item.pushedUser.name;
      })} 입니다.`,
    });
  } catch (error) {
    next(error);
  }
});

export { likeRouter };
