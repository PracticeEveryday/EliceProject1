import { UserModel } from "../db/index.js";

import { hashPassword } from "../utils/hashPassword.js";
//import { makeToken } from "../utils/makeToken.js";

import { makeToken, refresh } from "../utils/makeToken.js";

//import { redisClient } from "../utils/redis.js";

class loginService {
  static getUser = async ({ email, password }) => {
    const loginUser = await UserModel.findByEmail({ email });
    const hashedPassword = hashPassword(password);

    if (!loginUser || loginUser.whetherToDelete === true) {
      const errorMessage =
        "해당 이메일로 가입된 유저가 없습니다. 다시 한 번 확인해 주세요";
      return { errorMessage };
    } else if (loginUser.password === hashedPassword) {
      const ObjectId = String(loginUser._id);

      const accessToken = makeToken({
        userId: loginUser.id,
        ObjectId,
      });
      const refreshToken = refresh();

      return {
        accessToken,
        refreshToken,
      };
    } else {
      const errorMessage = "비밀번호가 틀립니다 다시 한 번 확인해 주세요";
      return { errorMessage };
    }
  };

  static update = async ({ userId, email, password, description, name }) => {
    let user = await UserModel.findById({ userId });

    if (!user) {
      const errorMessage = "해당 id로 가입된 유저가 없습니다.";
      return { errorMessage };
    }

    let checkEmail = await UserModel.findByEmail({ email });

    if (checkEmail) {
      const errorMessage = "이미 가입되어 있는 email입니다.";
      return { errorMessage };
    }

    const newValue = {
      email,
      password: hashPassword(password),
      description,
      name,
    };

    user = await UserModel.update(userId, newValue);

    return user;
  };

  static softDeleteUser = async ({ userId, whetherToDelete }) => {
    const user = UserModel.findById({ userId });
    if (!user) {
      const errorMessage = "해당 id로 가입된 유저가 없습니다.";
      return { errorMessage };
    }
    const softDeletedUser = await UserModel.softDeleteUser({
      userId,
      whetherToDelete,
    });
    return softDeletedUser;
  };
}

export { loginService };
