const { Router } = require("express");
const is = require("@sindresorhus/is");

const userAuthRouter = Router();
const userAuthService = require("../services/userService");

userAuthRouter.post("/user/register", async (req, res) => {
  const { name, email, password } = req.body;
  const userData = {
    ...req.body,
  };
  console.log(name, email, password);
  const newUser = await userAuthService.addUser(userData);

  res.json({
    name,
    email,
    password,
  });
});

userAuthRouter.get("/user", (req, res) => {
  // 이다인거 확인하는 친구
  console.log(is("🦄"));

  res.send("user Page 임");
});

module.exports = userAuthRouter;
