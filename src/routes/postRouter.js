import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { checkLogin } from "../middleware/checkLogin.js";

import { PostService } from "../service/postService.js";
const postRouter = Router();

postRouter.use(verifyToken);
postRouter.use(checkLogin);

postRouter.post("/post", async (req, res, next) => {
  try {
    const writeUser = req.user.ObjectId;
    const { tagUser, context } = req.body;

    const newPost = await PostService.addPost({ writeUser, tagUser, context });

    res.status(200).json({
      newPost,
    });
  } catch (error) {
    next(error);
  }
});

postRouter.delete("/post/delete/:id", async (req, res, next) => {
  try {
    const postId = req.params.id;
    const writeUser = req.user.ObjectId;
    const removedPost = await PostService.removePost({ postId, writeUser });

    if (removedPost.errorMessage) {
      throw new Error(removedPost.errorMessage);
    }
    res.status(200).json({
      removedPost,
    });
  } catch (error) {
    next(error);
  }
});

postRouter.put("/post/modify/:id", async (req, res, next) => {
  try {
    const postId = req.params.id;
    const writeUser = req.user.ObjectId;
    const context = req.body.context;
    const tagUser = req.body.tagUser;
    const modifiedPost = await PostService.modifyPost({
      postId,
      writeUser,
      context,
      tagUser,
    });

    if (modifiedPost.errorMessage) {
      throw new Error(modifiedPost.errorMessage);
    }
    res.status(200).json(modifiedPost);
  } catch (error) {
    next(error);
  }
});

export { postRouter };
