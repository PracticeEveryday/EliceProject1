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
      // console.log("loginUser", loginUser._id);
      const ObjectId = String(loginUser._id);
      // console.log(ObjectId);
      const token = makeToken({
        userId: loginUser.id,
        ObjectId: ObjectId,
      });
      return {
        token,
        name: loginUser.name,
      };
    } else {
      const errorMessage = "비밀번호가 틀립니다 다시 한 번 확인해 주세요";
      return { errorMessage };
    }
  };

  static update = async ({ userId, email, password, description, name }) => {
    const hashedPassword = hashPassword(password);
    const updateData = { name, email, password: hashedPassword, description };

    let user = await UserModel.findById({ userId });
    // console.log(user);
    if (!user) {
      const errorMessage = "해당 id로 가입된 유저가 없습니다.";
      return { errorMessage };
    }

    let checkEmail = await UserModel.findByEmail({ email });

    if (checkEmail) {
      const errorMessage = "이미 가입되어 있는 email입니다.";
      return { errorMessage };
    }

    if (updateData.name) {
      const updateFilter = "name";
      const newValue = updateData.name;

      user = await UserModel.update(userId, updateFilter, newValue);
    }

    if (updateData.email) {
      const updateFilter = "email";
      const newValue = updateData.email;

      user = await UserModel.update(userId, updateFilter, newValue);
    }

    if (updateData.password) {
      const updateFilter = "password";
      const newValue = updateData.password;

      user = await UserModel.update(userId, updateFilter, newValue);
    }

    if (updateData.description) {
      const updateFilter = "description";
      const newValue = updateData.description;

      user = await UserModel.update(userId, updateFilter, newValue);
    }

    return user;
  };

  static removeUser = async ({ userId }) => {
    const user = UserModel.findById({ userId });
    if (!user) {
      const errorMessage = "해당 id로 가입된 유저가 없습니다.";
      return { errorMessage };
    }
    await UserModel.removeUser({ userId });
    return {
      status: "success",
    };
  };
}

export { loginService };
