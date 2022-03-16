const userModel = require("../schema/user");

class User {
  static create = async ({ addUserData }) => {
    console.log(addUserData);
    const createdNewUser = await userModel.create(addUserData);
    return createdNewUser;
  };

  static findByEmail = async ({ email }) => {
    const user = userModel.findOne({ email });
    return user;
  };

  static findAll = async () => {
    const users = userModel.find({});
    return users;
  };
}

module.exports = User;
