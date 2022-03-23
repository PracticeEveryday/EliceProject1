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

  static removePost = async ({ postId, writeUser }) => {
    const foundPost = await PostModel.findById({ postId });
    if (!foundPost) {
      const errorMessage = " 삭제할 포스터가 없습니다.";
      return { errorMessage };
    }

    if (String(foundPost.writeUser) === writeUser) {
      const removedPost = await PostModel.removePost({ postId });
      return {
        status: "succ",
        message: "삭제되었습니다.",
        removedPost,
      };
    } else {
      const errorMessage = "작성자와 로그인 대상이 다릅니다.";
      return { errorMessage };
    }
  };

  static modifyPost = async ({ postId, writeUser, context, tagUser }) => {
    const foundPost = await PostModel.findById({ postId });

    if (!foundPost) {
      const errorMessage = "해당 포스터가 없습니다.";
      return { errorMessage };
    }

    if (String(foundPost.writeUser) === writeUser) {
      const modifiedPost = await PostModel.modifyPost({
        postId,
        context,
        tagUser,
      });

      return modifiedPost;
    } else {
      const errorMessage = "작성자와 로그인 대상이 다릅니다.";
      return { errorMessage };
    }
  };
}

export { PostService };
