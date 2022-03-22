import { PostModel } from "../db/index.js";
import { v4 as uuidv4 } from "uuid";
class PostService {
  static addPost = async ({ writeUser, tagUser, context }) => {
    const id = uuidv4();
    const newPostData = {
      id,
      writeUser,
      tagUser,
      context,
    };
    const newPost = await PostModel.create(newPostData);
    return newPost;
  };
}

export { PostService };
