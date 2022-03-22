import { Post } from "../schemas/post.js";

class PostModel {
  static create = async (newPostData) => {
    const newPost = await Post.create(newPostData);
    return newPost;
  };
}

export { PostModel };
