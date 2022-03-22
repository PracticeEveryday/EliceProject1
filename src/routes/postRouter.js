import { Router } from "express";

const postRouter = Router();

postRouter.get("/post", (req, res, next) => {
  res.status(200).json({
    status: "succ",
  });
});

export { postRouter };
