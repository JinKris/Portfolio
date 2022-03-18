import { awardModel } from "../schemas/award";
class Award {
  static create = async ({ id, userId, title, description }) => {
    const updateData = {
      id,
      userId,
      title,
      description,
    };

    const createdAward = await awardModel.create(updateData);
    return createdAward;
  };

  static findById = async ({ userId }) => {
    const award = await awardModel.findOne({ id: userId });
    return award;
  };

  static findByUserId = async ({ userId }) => {
    const awards = await awardModel.find({ userId });
    return awards;
  };

  static update = async ({ userId, updataField, newValue }) => {
    const filter = { id: userId };
    const update = { [updataField]: newValue };
    const option = { returnOriginal: false };

    const updatedAward = await awardModel.findOneAndUpdate(
      filter,
      update,
      option
    );

    return updatedAward;
  };

  static deleteById = async ({ awardId }) => {
    const deletedData = await awardModel.deleteOne({ id: awardId });
    const isDataDeleted = deletedData.deletedCount === 1;
    return isDataDeleted;
  };
}

export { Award };
