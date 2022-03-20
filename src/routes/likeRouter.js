import { Router } from "express";

import { verifyToken } from "../middleware/verifyToken.js";
import { checkLogin } from "../middleware/checkLogin.js";

const likeRouter = Router();

likeRouter.use(verifyToken);
likeRouter.use(checkLogin);

likeRouter.post("/like/pushLike", async (req, res, next) => {
  try {
    const user_id = req.user;
    console.log(user_id);

    res.status(200).send("test");
  } catch (error) {
    next(error);
  }
});

export { likeRouter };
