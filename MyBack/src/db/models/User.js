const userModel = require("../schema/user");

class User {
  static create = async (userData) => {
    const createdNewUser = await userModel.create(userData);
    return createdNewUser;
  };

  static async findByEmail(email) {
    const user = await userModel.findOne({ email });
    return user;
  }

  static async findById({ user_id }) {
    const user = await userModel.findOne({ id: user_id });
    return user;
  }

  static async findAll() {
    const users = await userModel.find({});
    return users;
  }

  static async update({ user_id, updateDataField, newValue }) {
    const filter = { id: user_id };
    const update = { [updateDataField]: newValue };
    const option = { returnOriginal: false };

    const updatedUser = await userModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedUser;
  }
}

module.exports = User;
