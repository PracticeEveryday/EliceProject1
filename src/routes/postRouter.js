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

export { postRouter };
