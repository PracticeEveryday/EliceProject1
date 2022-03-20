import { Router } from "express";

import { registerService } from "../service/registerService.js";

const registerRouter = Router();

registerRouter.post("/register", async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const newUser = await registerService.addUser({ email, password, name });

    if (newUser.errorMessage) {
      throw new Error(newUser.errorMessage);
    }

    res.status(201).json(newUser);
  } catch (error) {
    res.status(404).json({
      error:
        "이미 해당 이메일로 가입한 유저가 있습니다. 다른 이메일을 사용하세요",
    });
    next(error);
  }
});

export { registerRouter };
