import { UserModel } from "../db/index.js";

import { hashPassword } from "../utils/hashPassword.js";
import { makeToken } from "../utils/makeToken.js";
class loginService {
  static getUser = async ({ email, password }) => {
    const loginUser = await UserModel.findByEmail({ email });
    const hashedPassword = hashPassword(password);
    if (!loginUser) {
      const errorMessage =
        "해당 이메일로 가입된 유저가 없습니다. 다시 한 번 확인해 주세요";
      return { errorMessage };
    } else if (loginUser.password === hashedPassword) {
      const token = makeToken({ user_id: loginUser.id });
      return {
        token,
        name: loginUser.name,
      };
    } else {
      const errorMessage = "비밀번호가 틀립니다 다시 한 번 확인해 주세요";
      return { errorMessage };
    }
  };
}

export { loginService };
