import { Router } from "express";

import { loginService } from "../service/loginService.js";
import { verifyToken } from "../middleware/verifyToken.js";

const loginRouter = Router();

loginRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const loginUser = await loginService.getUser({ email, password });

    if (loginUser.errorMessage) {
      res.status(404).json({
        error: "해당 이메일로 가입된 유저가 없습니다. 다시 한 번 확인해 주세요",
      });
      throw new Error(loginUser.errorMessage);
    }
    res.status(200).json(loginUser);
  } catch (error) {
    next(error);
  }
});

loginRouter.get("/login/verify", verifyToken, (req, res, next) => {
  const user_id = req.user;
  console.log(user_id);
  res.status(200).json({
    status: "succ",
    user_id,
  });
});

export { loginRouter };
