import is from "@sindresorhus/is";
import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { awardService } from "../services/awardService";

const awardRouter = Router();

awardRouter.use(loginRequired);

awardRouter.post("/award/create", async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const { user_id, title, description } = req.body;
    const createdData = await awardService.addAward({
      user_id,
      title,
      description,
    });

    res.status(200).json(createdData);
  } catch (error) {
    next(error);
  }
});

awardRouter.get("/awards/:id", async (req, res, next) => {
  try {
    const user_id = req.params.id;
    const award = await awardService.getAward({ user_id });

    if (award.errorMessage) {
      throw new Error(award.errorMessage);
    }

    res.status(200).json(award);
  } catch (error) {
    next(error);
  }
});

awardRouter.put("/awards/:id", async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const user_id = req.params.id;
    console.log(req.body);

    const updateData = await awardService.setAward({
      user_id,
      title,
      description,
    });
    console.log(updateData);
    res.status(200).json(updateData);
  } catch (error) {
    next(error);
  }
});

awardRouter.get("/awardlist/:user_id", async (req, res, next) => {
  try {
    const user_id = req.params.user_id;
    const awardList = await awardService.getAwardList({ user_id });

    if (awardList.errorMessage) {
      throw new Error(awardList.errorMessage);
    }

    res.status(200).json(awardList);
  } catch (error) {
    next(error);
  }
});

awardRouter.delete("/awards/:id", async function (req, res, next) {
  try {
    const awardId = req.params.id;

    const result = await awardService.deleteAward({ awardId });

    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

export { awardRouter };
