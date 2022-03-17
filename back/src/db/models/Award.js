const awardModel = require("../schemas/award");

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

  static update = async ({ user_id, updataField, newValue }) => {
    const filter = { id: user_id };
    const update = { [updataField]: newValue };
    const option = { returnOriginal: false };

    const updatedAward = await awardModel.findOneAndUpdate(
      filter,
      update,
      option
    );

    return updatedAward;
  };
}

module.exports = Award;
