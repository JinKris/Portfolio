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
}

module.exports = User;
