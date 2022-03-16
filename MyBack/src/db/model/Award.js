const awardModel = require("../schema/award");

class Award {
  static create = async ({ id, user_id, title, description }) => {
    const updateData = {
      id,
      user_id,
      title,
      description,
    };
    console.log(updateData);
    const createdAward = await awardModel.create(updateData);
    return createdAward;
  };
}

module.exports = Award;
