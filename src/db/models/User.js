import { User } from "../schemas/user.js";

class UserModel {
  static create = async (newUserData) => {
    const createdUser = await User.create(newUserData);
    return createdUser;
  };

  static findByEmail = async ({ email }) => {
    const user = await User.findOne({ email });
    return user;
  };

  static findById = async ({ user_id }) => {
    const user = await User.findOne({ id: user_id });
    return user;
  };
  /*
  findOneAndUpdate({firstname:Medina"}, {firstname : "Alex", age : 18}, (err) => {
    if (err) {
      console.log("err)
    }
  첫번쨰 인수 : 찾을 객체
  첫번째 인수를 기반으로하는 사용자를 찾을것이다
  두번째 인수 
   */
  static update = async (user_id, updateFilter, newValue) => {
    const filter = { id: user_id };
    const updateContent = { [updateFilter]: newValue };
    const option = { returnOriginal: false };

    const updatedUser = await User.findOneAndUpdate(
      filter,
      updateContent,
      option
    );
    return updatedUser;
  };
}

export { UserModel };
