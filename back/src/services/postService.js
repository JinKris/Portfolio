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
    console.log(post);
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
