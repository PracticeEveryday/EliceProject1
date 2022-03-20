import { likeModel } from "../db/index.js";
import { v4 as uuidv4 } from "uuid";
class likeService {
  static addLike = async ({ userId, ObjectId }) => {
    const id = uuidv4();
    const addLikeDate = {
      id,
      userId,
      ObjectId,
    };
    const likedUser = await likeModel.addLike(addLikeDate);
    return likedUser;
  };
}

export { likeService };
