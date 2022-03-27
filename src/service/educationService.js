import { EducationModel } from "../db";

import { v4 as uuidv4 } from "uuid";
// import moment from "moment";
class educationService {
  static create = async ({ userId, school, fromDate, toDate }) => {
    // fromDate = moment(fromDate).format("YYYY-MM-DD");
    // toDate = moment(toDate).format("YYYY-MM-DD");
    const educationId = uuidv4();
    const newEducationData = { educationId, userId, school, fromDate, toDate };
    const newEducation = await EducationModel.create(newEducationData);
    return newEducation;
  };

  static findUserSchool = async ({ userId }) => {
    const user = await EducationModel.findByUserId({ userId });

    if (!user) {
      const errorMessage = "해당 유저의 학교 정보가 없습니다.";
      return { errorMessage };
    }
    const schoolsOfUser = await EducationModel.findUserSchool({ userId });
    return schoolsOfUser;
  };

  static update = async ({ educationId, school, fromDate, toDate }) => {
    let education = await EducationModel.findByEducationId({ educationId });
    if (!education) {
      const errorMessage = "해당 학교 정보가 존재하지 않습니다.";
      return { errorMessage };
    }

    const updateEducationData = {
      school,
      fromDate,
      toDate,
    };
    education = await EducationModel.update(educationId, updateEducationData);
    return education;
  };

  static deleteEducation = async ({ educationId }) => {
    const removedEducation = await EducationModel.deleteEducation({
      educationId,
    });
    if (removedEducation) {
      return {
        status: "succ",
        message: "데이터가 삭제되었습니다.",
      };
    } else {
      return {
        status: "fail",
        message: "삭제할 해당 데이터가 없습니다.",
      };
    }
  };
}

export { educationService };
