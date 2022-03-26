import { Education } from "../schemas/education";

class EducationModel {
  static create = async (newEducationData) => {
    const newEducation = await Education.create(newEducationData);
    return newEducation;
  };
  static findById = async ({ userId }) => {
    const user = await Education.find().where("userId").equals(userId);
    return user;
  };
  static findUserSchool = async ({ userId }) => {
    const schoolOfUser = await Education.find()
      .where("userId")
      .equals(userId)
      .populate("userId");
    return schoolOfUser;
  };
}

export { EducationModel };
