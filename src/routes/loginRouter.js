import { Router } from "express";

import { loginService } from "../service/loginService.js";

import { verifyToken } from "../middleware/verifyToken.js";
import { checkLogin } from "../middleware/checkLogin.js";
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
  const userId = req.user;
  //console.log(userId);
  res.status(200).json({
    status: "succ",
    userId,
  });
});

loginRouter.put(
  "/login/change",
  verifyToken,
  checkLogin,
  async (req, res, next) => {
    try {
      const { email, password, description, name } = req.body;

      const userId = req.user.userId;

      const updatedUser = await loginService.update({
        userId,
        email,
        password,
        description,
        name,
      });

      if (updatedUser.errorMessage) {
        throw new Error(updatedUser.errorMessage);
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(404).json({
        error: "이미 가입되어 있는 email입니다. 다시 한 번 확인 부탁드립니다.",
      });
      next(error);
    }
  }
);

loginRouter.delete(
  "/login/delete",
  verifyToken,
  checkLogin,
  async (req, res, next) => {
    try {
      const userId = req.user;
      const result = await loginService.removeUser({ userId });
      if (result.errorMessage) {
        throw new Error(result.errorMessage);
      }
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
);
export { loginRouter };
