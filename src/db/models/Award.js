import { Award } from "../schemas/award.js";

class AwardModel {
  static create = async (newAwardData) => {
    const newAward = await Award.create(newAwardData);
    return newAward;
  };

  static findById = async ({ awardId }) => {
    const award = await Award.findOne({ awardId });
    return award;
  };

  static update = async (userId, updateData) => {
    const filter = { userId };
    const updateContext = updateData;
    const option = { returnOriginal: false };
    const updatedData = await Award.findOneAndUpdate(
      filter,
      updateContext,
      option
    );
    return updatedData;
  };

  static delete = async ({ awardId }) => {
    const removedAward = await Award.findOneAndDelete({ awardId });
    return removedAward;
  };
}

export { AwardModel };
