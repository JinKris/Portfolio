const { Router } = require("express");
const userAuthRouter = Router();

const userAuthService = require("../Service/userService");

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

    res.json(newUser);
  } catch (error) {
    next(error);
  }
});

module.exports = userAuthRouter;
