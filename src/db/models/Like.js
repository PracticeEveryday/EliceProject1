import { Like } from "../schemas/like.js";

class likeModel {
  static addLike = async (addLikeDate) => {
    const likedUser = await Like.create(addLikeDate);
    return likedUser;
  };

  static deleteLike = async ({ likeId }) => {
    console.log(likeId);
    await Like.findOneAndDelete({ id: likeId });
  };

  static findById = async ({ likeId }) => {
    const like = await Like.findOne({ id: likeId });
    return like;
  };

  static findAll = async ({ pushUser }) => {
    const likes = await Like.find({ pushUser });
    //console.log(likes);
    return likes;
  };

  static findLikedUser = async ({ pushUser }) => {
    const likedUser = await Like.find({ pushUser })
      .populate("pushedUser")
      .populate("pushUser");
    return likedUser;
  };
}

export { likeModel };
