const { Router } = require("express");
const is = require("@sindresorhus/is");
const veryfyToken = require("../middlewares/verifyToken");

const userAuthRouter = Router();
const userAuthService = require("../services/userService");

userAuthRouter.post("/user/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const newUser = await userAuthService.addUser({
      name,
      email,
      password,
    });

    //console.log(newUser);

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
    //console.log(email, password);

    const user = await userAuthService.getUser({
      email,
      password,
    });

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

userAuthRouter.get("/userlist", veryfyToken, async (req, res, next) => {
  try {
    const users = await userAuthService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.get("/user/current", veryfyToken, async (req, res, next) => {
  try {
    const user_id = req.currentUserId;
    const currentUserInfo = await userAuthService.getUserInfo({
      user_id,
    });

    if (currentUserInfo.errorMessage) {
      throw new Error(currentUserInfo.errorMessage);
    }

    res.json(currentUserInfo);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.get("/user", (req, res) => {
  // 이다인거 확인하는 친구
  console.log(is("🦄"));

  res.send("user Page 임");
});

module.exports = userAuthRouter;
