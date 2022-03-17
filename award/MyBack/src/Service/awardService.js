const { Award } = require("../db/index");
const { v4: uuidv4 } = require("uuid");

class AwardService {
  static addAward = async ({ user_id, title, description }) => {
    const id = uuidv4();
    const createdAward = await Award.create({
      id,
      user_id,
      title,
      description,
    });
    return createdAward;
  };

  static getAward = async ({ user_id }) => {
    const award = await Award.findById({ user_id });

    if (!award) {
      const errorMessage = "해당 id로 받은 수상 이력이 없습니다.";
      return { errorMessage };
    }

    return award;
  };

  static getAwardList = async ({ user_id }) => {
    const awardList = await Award.findByUserId({ user_id });
    return awardList;
  };

  static setAward = async ({ user_id, title, description }) => {
    let award = await Award.findById({ user_id });
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
      award = await Award.update({ user_id, updataField, newValue });
    }
    if (updateData.description) {
      const updataField = "description";
      const newValue = updateData.description;
      award = await Award.update({ user_id, updataField, newValue });
    }
    return award;
  };
}

module.exports = AwardService;
