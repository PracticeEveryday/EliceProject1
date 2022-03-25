import { Award } from "../schemas/award.js";

class AwardModel {
  static create = async (newAwardData) => {
    const newAward = await Award.create(newAwardData);
    return newAward;
  };
}

export { AwardModel };
