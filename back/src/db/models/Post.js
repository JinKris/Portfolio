import { postModel } from "../schemas/post";

class Post {
  static addPost = async ({ id, writeUser, context }) => {
    const newPostData = {
      id,
      writeUser,
      context,
    };
    const newPost = await postModel.create(newPostData);
    return newPost;
  };

  static findById = async ({ postId }) => {
    const foundPost = await postModel.findOne({ id: postId });
    return foundPost;
  };

  static deletePost = async ({ postId }) => {
    const deletePost = await postModel.findOneAndDelete({ id: postId });
    console.log(deletePost);
    return deletePost;
  };

  static findAll = async () => {
    const posts = await postModel.find({});
    return posts;
  };
}

export { Post };
