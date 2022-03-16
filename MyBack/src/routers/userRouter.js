const { Router } = require("express");
const userAuthRouter = Router();

const userAuthService = require("../Service/userService");

const verifyToken = require("../middleware/verifyToken");

userAuthRouter.post("/user/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await userAuthService.addUser({
      name,
      email,
      password,
    });

    if (newUser.errorMessage) {
      throw new Error(newUser.errorMessage);
    }

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.post("/user/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userAuthService.getUser({ email, password });

    if (user.errorMessage) {
      throw new Error(user.errorMessage);
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.get("/userlist", verifyToken, async (req, res, next) => {
  try {
    const users = await userAuthService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.get("/user/current", verifyToken, async (req, res, next) => {
  try {
    const user_id = req.user.user_id;
    console.log(user_id);
    const currentUser = await userAuthService.getUserInfo({ user_id });
    console.log(currentUser);
    if (currentUser.errorMessage) {
      throw new Error(currentUser.errorMessage);
    }
    res.status(200).json(currentUser);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.get("/users/:id", verifyToken, async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
module.exports = userAuthRouter;
