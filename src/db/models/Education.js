import { Education } from "../schemas/education";

class EducationModel {
  static create = async (newEducationData) => {
    const newEducation = await Education.create(newEducationData);
    return newEducation;
  };
}

export { EducationModel };
