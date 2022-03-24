import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired.js";

import { BoardService } from "../services/boardService.js";

const boardRouter = Router();
boardRouter.use(loginRequired);

boardRouter.post("/board/create", async (req, res, next) => {
  try {
    console.log(req.currentUserId);
    const writeUser = req.body.writeUser;
    const context = req.body.context;
    const newPost = await BoardService.addPost({ writeUser, context });
    res.status(200).json({
      newPost,
    });
  } catch (error) {
    next(error);
  }
});

boardRouter.post("/board/delete", async (req, res, next) => {
  try {
    const writeUser = req.body.writeUser;
    const postId = req.body.postId;
    const result = await BoardService.deletePost({ postId, writeUser });
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

boardRouter.put("/board/modify/:id", async (req, res, next) => {
  const postId = req.params.id;
  const writeUser = req.body.writeUser;
  const context = req.body.context;

  const modifiedPost = await BoardService.modifiedPost({
    postId,
    writeUser,
    context,
  });

  res.status(200).json({ modifiedPost: modifiedPost });
});

boardRouter.get("/boardlist", async (req, res, next) => {
  try {
    const posts = await BoardService.findAll();
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

boardRouter.get("/boardlist/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const posts = await BoardService.findByUserId(userId);
    console.log(posts);

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});

boardRouter.get("/post", (req, res, next) => {
  res.json({
    status: "succ",
  });
});

export { boardRouter };
