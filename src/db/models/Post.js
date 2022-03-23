import { Post } from "../schemas/post.js";

class PostModel {
  static create = async (newPostData) => {
    const newPost = await Post.create(newPostData);
    return newPost;
  };

  static findById = async ({ postId }) => {
    const foundUser = await Post.findOne({ id: postId });
    return foundUser;
  };

  static removePost = async ({ postId }) => {
    const removedPost = await Post.findOneAndDelete({ id: postId });
    return removedPost;
  };

  static modifyPost = async ({ postId, context, tagUser }) => {
    const filter = { id: postId };
    const newValue = {
      context,
      tagUser,
    };
    const option = { returnOriginal: false };
    const modifiedPost = await Post.findOneAndUpdate(filter, newValue, option);
    return modifiedPost;
  };
}

export { PostModel };
