import is from "@sindresorhus/is";
import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired.js";

import { PostService } from "../services/postService";

const postRouter = Router();
postRouter.use(loginRequired);

postRouter.post("/post/create", async (req, res, next) => {
  try {
    console.log(req.currentUserId);
    const writeUser = req.body.writeUser;
    const context = req.body.context;
    const newPost = await PostService.addPost({ writeUser, context });
    res.status(200).json({
      newPost,
    });
  } catch (error) {
    next(error);
  }
});

postRouter.post("/post/delete", async (req, res, next) => {
  try {
    const writeUser = req.body.writeUser;
    const postId = req.body.postId;
    const result = await PostService.deletePost({ postId, writeUser });
    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }
    res.status(200).json({
      ...result,
    });
  } catch (error) {
    next(error);
  }
});

postRouter.put("/post/modify/:id", async (req, res, next) => {
  const postId = req.params.id;
  const writeUser = req.body.writeUser;
  const context = req.body.context;

  const modifiedPost = await PostService.modifiedPost({
    postId,
    writeUser,
    context,
  });

  res.status(200).json({ modifiedPost: modifiedPost });
});

postRouter.get("/postlist", async (req, res, next) => {
  try {
    const posts = await PostService.findAll();
    if (posts.errorMessage) {
      throw new Error(posts.errorMessage);
    }
    res.status(200).json({
      posts,
    });
  } catch (error) {
    next(error);
  }
});

postRouter.get("/postlist/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const posts = await PostService.findByUserId(userId);
    console.log(posts);

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});

postRouter.get("/post", (req, res, next) => {
  res.json({
    status: "succ",
  });
});

export { postRouter };
