const awardModel = require("../schema/award");

class Award {
  static create = async ({ id, user_id, title, description }) => {
    const updateData = {
      id,
      user_id,
      title,
      description,
    };

    const createdAward = await awardModel.create(updateData);
    return createdAward;
  };

  static findById = async ({ user_id }) => {
    const award = await awardModel.findOne({ id: user_id });
    return award;
  };
}

module.exports = Award;
