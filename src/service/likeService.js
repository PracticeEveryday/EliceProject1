import { likeModel } from "../db/index.js";
import { v4 as uuidv4 } from "uuid";
class likeService {
  static addLike = async ({ pushUser, pushedUser }) => {
    const id = uuidv4();
    const addLikeDate = {
      id,
      pushUser,
      pushedUser,
    };
    const likedUser = await likeModel.addLike(addLikeDate);
    return likedUser;
  };

  static deleteLike = async ({ likeId }) => {
    const like = await likeModel.findById({ likeId });
    if (!like) {
      const errorMessage =
        "해당 아이디의 좋아요가 없습니다. 다시 한 번 확인 해주세요";
      return { errorMessage };
    }
    await likeModel.deleteLike(likeId);
    return like;
  };

  static likes = async ({ pushUser }) => {
    const likes = await likeModel.findAll({ pushUser });
    return likes;
  };

  static likedUsers = async ({ pushUser }) => {
    const likedUser = await likeModel.findLikedUser({ pushUser });
    return likedUser;
  };
}

export { likeService };
