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
}

module.exports = User;
