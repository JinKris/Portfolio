const { Router } = require("express");
const is = require("@sindresorhus/is");

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

userAuthRouter.get("/user", (req, res) => {
  // 이다인거 확인하는 친구
  console.log(is("🦄"));

  res.send("user Page 임");
});

module.exports = userAuthRouter;
