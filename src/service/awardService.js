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

  static modify = async ({ userId, awardId, title, description }) => {
    let award = await AwardModel.findById({ awardId });
    if (!award) {
      const errorMessage = "해당 수상 이력이 없습니다.";
      return { errorMessage };
    }

    if (String(award.userId) !== userId) {
      const errorMessage = "해당 수상자가 아닙니다.";
      return { errorMessage };
    }
    const updateData = { title, description };

    award = await AwardModel.update(userId, updateData);
    return award;
  };

  static deleteAward = async ({ awardId }) => {
    let award = await AwardModel.findById({ awardId });
    if (!award) {
      const errorMessage = "해당 수상 이력이 없습니다.";
      return { errorMessage };
    }

    const removedAward = await AwardModel.delete({ awardId });
    if (removedAward) {
      return { status: "succ" };
    }
  };
}

export { awardService };
