const userModel = require("../schema/user");

class User {
  static addUser = async (userData) => {
    const newUser = await userModel.create(userData);
    return newUser;
  };
}

module.exports = User;
