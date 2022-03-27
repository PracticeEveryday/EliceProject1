import { Education } from "../schemas/education";

class EducationModel {
  static create = async (newEducationData) => {
    const newEducation = await Education.create(newEducationData);
    return newEducation;
  };
  static findByUserId = async ({ userId }) => {
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

  static findByEducationId = async ({ educationId }) => {
    const education = await Education.find()
      .where("educationId")
      .equals(educationId);
    return education;
  };
  static update = async (educationId, updateEducationData) => {
    const filter = { educationId: educationId };
    const updateContext = updateEducationData;
    const option = { returnOriginal: false };

    const updatedEducation = await Education.findOneAndUpdate(
      filter,
      updateContext,
      option
    );
    return updatedEducation;
  };

  static deleteEducation = async ({ educationId }) => {
    const removedEducation = await Education.findOneAndDelete({ educationId });
    return removedEducation;
  };
}

export { EducationModel };
