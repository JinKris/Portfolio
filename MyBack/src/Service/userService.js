const User = require("../db/index");

const hashPassword = require("../utils/hashPassword");

const { v4: uuidv4 } = require("uuid");
// uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

class userAuthService {
  static addUser = async ({ name, email, password }) => {
    const id = uuidv4();

    const user = await User.findByEmail({ email });
    console.log(email);
    console.log(user);
    if (user) {
      const errorMessage = "이메일이 이미 있습니다 ㅠㅠ";
      return { errorMessage };
    }
    const hashedPassword = await hashPassword(password, 10);

    const addUserData = {
      id,
      name,
      email,
      password: hashedPassword,
    };

    const createdNewUser = await User.create({ addUserData });
    createdNewUser.errorMessage = null;

    return createdNewUser;
  };
}

module.exports = userAuthService;
