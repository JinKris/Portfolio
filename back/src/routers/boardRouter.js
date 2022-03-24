import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired.js";

import { BoardService } from "../services/boardService.js";

const boardRouter = Router();
boardRouter.use(loginRequired);

boardRouter.post("/board/create", async (req, res, next) => {
  try {
    const writeUser = req.body.writeUser;
    const context = req.body.context;
    const newBoard = await BoardService.addBoard({ writeUser, context });
    res.status(200).json({
      newBoard,
    });
  } catch (error) {
    next(error);
  }
});

boardRouter.post("/board/delete", async (req, res, next) => {
  try {
    const writeUser = req.body.writeUser;
    const boardId = req.body.boardId;
    const result = await BoardService.deleteBoard({ boardId, writeUser });
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
  const boardId = req.params.id;
  const writeUser = req.body.writeUser;
  const context = req.body.context;

  const modifiedBoard = await BoardService.modifiedBoard({
    boardId,
    writeUser,
    context,
  });

  res.status(200).json({ modifiedBoard: modifiedBoard });
});

boardRouter.get("/boardlist", async (req, res, next) => {
  try {
    const boards = await BoardService.findAll();
    if (boards.errorMessage) {
      throw new Error(boards.errorMessage);
    }
    res.status(200).json({
      boards,
    });
  } catch (error) {
    next(error);
  }
});

boardRouter.get("/boardlist/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const boards = await BoardService.findByUserId(userId);

    res.status(200).json(boards);
  } catch (error) {
    next(error);
  }
});

boardRouter.get("/board", (req, res, next) => {
  res.json({
    status: "succ",
  });
});

export { boardRouter };
