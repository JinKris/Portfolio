import { Post } from "../db";
import { v4 as uuidv4 } from "uuid";

class PostService {
  static addPost = async ({ writeUser, context }) => {
    const id = uuidv4();
    const newPost = await Post.addPost({ id, writeUser, context });
    return newPost;
  };

  static deletePost = async ({ postId, writeUser }) => {
    const post = await Post.findById({ postId });
    if (post.writeUser !== writeUser) {
      const errorMessage =
        "사용자와 작성자가 다릅니다. 다시 한 번 확인 해주세요.";
      return { errorMessage };
    }
    await Post.deletePost({ postId });
    return {
      sataus: "success",
    };
  };

  static modifiedPost = async ({ postId, writeUser, context }) => {
    const post = await Post.findById({ postId });
    if (!post) {
      const errorMessage = "게시물을 찾을 수 없습니다.";
      return { errorMessage };
    }

    if (post.writeUser !== writeUser) {
      const errorMessage =
        "사용자와 작성자가 다릅니다. 다시 한 번 확인 해주세요.";
      return { errorMessage };
    }

    const modifiedPost = await Post.update(postId, context);
    return modifiedPost;
  };

  static findAll = async () => {
    const posts = await Post.findAll();
    if (posts.length === 0) {
      const errorMessage = "게시된 게시물이 하나도 없습니다.";
      return { errorMessage };
    }
    return posts;
  };
}

export { PostService };
