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
    return deletePost;
  };

  static findAll = async () => {
    const posts = await postModel.find({});
    return posts;
  };

  static update = async (postId, context) => {
    const filter = { id: postId };
    const updateContext = { context };
    const option = { returnOriginal: false };
    const updatedData = postModel.findOneAndUpdate(
      filter,
      updateContext,
      option
    );
    return updatedData;
  };

  static findByUserId = async (userId) => {
    const posts = await postModel.find({ writeUser: userId });
    return posts;
  };
}

export { Post };
