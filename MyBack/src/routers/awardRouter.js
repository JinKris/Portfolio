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

awardRouter.get("/awards/:id", verifyToken, async (req, res, next) => {
  try {
    const user_id = req.params.id;
    const award = await AwardService.getAward({ user_id });

    if (award.errorMessage) {
      throw new Error(award.errorMessage);
    }

    res.status(200).json(award);
  } catch (error) {
    next(error);
  }
});

module.exports = awardRouter;
