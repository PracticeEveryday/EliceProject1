import { AwardModel } from "../db/index.js";
import { v4 as uuidv4 } from "uuid";
class awardService {
  static create = async ({ userId, title, description }) => {
    const awardId = uuidv4();
    const newAwardData = {
      awardId,
      userId,
      title,
      description,
    };
    const newAward = await AwardModel.create(newAwardData);
    return newAward;
  };
}

export { awardService };
