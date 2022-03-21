import { UserModel } from "../db/index.js";

class loginService {
  static getUser = async ({ email, password }) => {
    const loginUser = await UserModel.findByEmail({ email });
    const hashedPassword = UserModel.hashPassword(password);

    if (!loginUser) {
      const errorMessage =
        "해당 이메일로 가입된 유저가 없습니다. 다시 한 번 확인해 주세요";
      return { errorMessage };
    } else if (loginUser.password === hashedPassword) {
      const ObjectId = String(loginUser._id);
      const token = UserModel.makeToken({
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
      password: UserModel.hashPassword(password),
      description,
      name,
    };

    user = await UserModel.update(userId, newValue);

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
