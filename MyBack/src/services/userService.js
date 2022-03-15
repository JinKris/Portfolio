const User = require("../db/index");
const { v4: uuidv4 } = require("uuid");
//uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

class userAuthService {
  static addUser = async (userData) => {
    const id = uuidv4();
    const newUser = {
      ...userData,
      id,
    };
    const createdNewUser = await User.addUser(newUser);
    return createdNewUser;
  };
}

module.exports = userAuthService;
