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
    const user = await EducationModel.findById({ userId });

    if (!user) {
      const errorMessage = "해당 유저의 학교 정보가 없습니다.";
      return { errorMessage };
    }
    const schoolsOfUser = await EducationModel.findUserSchool({ userId });
    return schoolsOfUser;
  };
}

export { educationService };
