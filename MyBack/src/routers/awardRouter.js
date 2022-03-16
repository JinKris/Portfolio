const { Router } = require("express");
const awardRouter = Router();
const AwardService = require("../Service/awardService");

const verifyToken = require("../middleware/verifyToken");

awardRouter.post("/award/create", verifyToken, async (req, res, next) => {
  try {
    const { user_id, title, description } = req.body;
    const createdData = await AwardService.addAward({
      user_id,
      title,
      description,
    });

    res.status(200).json(createdData);
  } catch (error) {
    next(error);
  }
});

module.exports = awardRouter;
