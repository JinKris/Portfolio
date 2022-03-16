const User = require("../db/index");

const hashPassword = require("../utils/hashPassword");
const makeToken = require("../utils/makeToken");
const bcrypt = require("bcrypt");

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

  static getUser = async ({ email, password }) => {
    const user = await User.findByEmail({ email });
    console.log(user);

    // const hashedPassword = await hashPassword(password, 10);
    // console.log(hashedPassword);
    // console.log(user.password);

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );

    const token = makeToken({ user_id: user.id });
    if (!user) {
      const errorMessage = "가입된 아이디가 없습니다.";
      return { errorMessage };
    } else if (isPasswordCorrect) {
      return {
        token,
        id: user.id,
        description: user.description,
        email: user.email,
        name: user.name,
        errorMessage: null,
      };
    } else {
      const errorMessage = "비밀번호가 틀립니다.";
      return { errorMessage };
    }
  };

  static getUsers = async () => {
    const users = await User.findAll();
    return users;
  };

  static getUserInfo = async ({ user_id }) => {
    const currentUser = await User.findById({ user_id });
    if (!currentUser) {
      const errorMessage = "가입내역이 없습니다.";
      return { errorMessage };
    }
    return currentUser;
  };
}

module.exports = userAuthService;
