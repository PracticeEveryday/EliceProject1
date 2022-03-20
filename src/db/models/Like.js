import { Like } from "../schemas/like.js";

class likeModel {
  static addLike = async (addLikeDate) => {
    console.log(addLikeDate);
    const likedUser = await Like.create(addLikeDate);
    return likedUser;
  };
}

export { likeModel };
