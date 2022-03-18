import { Award } from "../db";
import { v4 as uuidv4 } from "uuid";

class awardService {
  static addAward = async ({ userId, title, description }) => {
    const id = uuidv4();
    const createdAward = await Award.create({
      id,
      userId,
      title,
      description,
    });
    return createdAward;
  };

  static getAward = async ({ userId }) => {
    const award = await Award.findById({ userId });

    if (!award) {
      const errorMessage = "해당 id로 받은 수상 이력이 없습니다.";
      return { errorMessage };
    }

    return award;
  };

  static getAwardList = async ({ userId }) => {
    const awardList = await Award.findByUserId({ userId });
    return awardList;
  };

  static setAward = async ({ userId, title, description }) => {
    let award = await Award.findById({ userId });
    console.log(award);
    if (!award) {
      const errorMessage = "해당 id로 받은 수상 이력이 없습니다.";
      return { errorMessage };
    }

    const updateData = { title, description };
    console.log(updateData);

    if (updateData.title) {
      const updataField = "title";
      const newValue = updateData.title;
      award = await Award.update({ userId, updataField, newValue });
    }
    if (updateData.description) {
      const updataField = "description";
      const newValue = updateData.description;
      award = await Award.update({ userId, updataField, newValue });
    }
    return award;
  };

  static deleteAward = async ({ awardId }) => {
    const deletedData = await Award.deleteById({ awardId });

    if (!deletedData) {
      const errorMessage = "해당 id 데이터 없습니다.";
      return { errorMessage };
    }
    return {
      status: "succ",
    };
  };
}

export { awardService };
