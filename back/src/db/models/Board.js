import { boardModel } from "../schemas/board";

class Board {
  static addPost = async ({ id, writeUser, context }) => {
    const newPostData = {
      id,
      writeUser,
      context,
    };
    const newPost = await boardModel.create(newPostData);
    return newPost;
  };

  static findById = async ({ postId }) => {
    const foundPost = await boardModel.findOne({ id: postId });
    return foundPost;
  };

  static deletePost = async ({ postId }) => {
    const deletePost = await boardModel.findOneAndDelete({ id: postId });
    return deletePost;
  };

  static findAll = async () => {
    const posts = await boardModel.find({});
    return posts;
  };

  static update = async (postId, context) => {
    const filter = { id: postId };
    const updateContext = { context };
    const option = { returnOriginal: false };
    const updatedData = boardModel.findOneAndUpdate(
      filter,
      updateContext,
      option
    );
    return updatedData;
  };

  static findByUserId = async (userId) => {
    const posts = await boardModel.find({ writeUser: userId });
    return posts;
  };
}

export { Board };
