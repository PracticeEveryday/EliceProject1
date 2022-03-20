import { UserModel } from "../db/index.js";
import { v4 as uuidv4 } from "uuid";

import { hashPassword } from "../utils/hashPassword.js";

class registerService {
  static addUser = async ({ email, password, name }) => {
    const user = await UserModel.findByEmail({ email });
    if (user) {
      const errorMessage =
        "이미 해당 이메일로 가입한 유저가 있습니다. 다른 이메일을 사용하세요";
      return { errorMessage };
    }

    const id = uuidv4();
    const hashedPassword = hashPassword(password);
    const newUserData = { id, email, password: hashedPassword, name };
    const createdUser = await UserModel.create(newUserData);
    return createdUser;
  };
}

export { registerService };
