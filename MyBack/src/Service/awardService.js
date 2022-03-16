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
}

module.exports = AwardService;
