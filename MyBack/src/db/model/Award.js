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

  static findByUserId = async ({ user_id }) => {
    const awards = await awardModel.find({ user_id });
    return awards;
  };
}

module.exports = Award;
