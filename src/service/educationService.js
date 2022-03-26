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
}

export { educationService };
