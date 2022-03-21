import { User } from "../schemas/user.js";
console.log("User static", User.setPassword);
const user = new User();
console.log("user instance", user.hashPassword);
class UserModel {
  static create = async (newUserData) => {
    const createdUser = await User.create(newUserData);
    return createdUser;
  };

  static findByEmail = async ({ email }) => {
    const user = await User.findOne({ email });
    return user;
  };

  static findById = async ({ userId }) => {
    const user = await User.findOne({ id: userId });
    return user;
  };

  static update = async (userId, updateFilter, newValue) => {
    const filter = { id: userId };
    const updateContent = { [updateFilter]: newValue };
    const option = { returnOriginal: false };

    const updatedUser = await User.findOneAndUpdate(
      filter,
      updateContent,
      option
    );
    return updatedUser;
  };

  static removeUser = async ({ userId }) => {
    await User.deleteOne({ id: userId });
  };
}

export { UserModel };
