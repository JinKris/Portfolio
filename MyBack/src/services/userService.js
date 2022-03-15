const User = require("../db/index");
const { v4: uuidv4 } = require("uuid");
const hashPassword = require("../utils/hashPassword");
//uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
const makeToken = require("../utils/makeToken");

class userAuthService {
  static setUser = async ({ user_id, updateData }) => {
    let user = await User.findById({ user_id });

    if (!user) {
      const errorMessage = "회원가입이 되어 있지 않습니다!";
      return { errorMessage };
    }
    // updataDta.name에 값이 있으면
    /* update({ user_id, updateDataField, newValue }) */
    if (updateData.name) {
      const updateDataField = "name";
      const newValue = updateData.name;
      user = await User.update({ user_id, updateDataField, newValue });
    }

    if (updateData.email) {
      const updateDataField = "email";
      const newValue = updateData.email;
      user = await User.update({ user_id, updateDataField, newValue });
    }

    if (updateData.password) {
      const updateDataField = "password";
      const newValue = updateData.password;
      user = await User.update({ user_id, updateDataField, newValue });
    }

    if (updateData.description) {
      const updateDataField = "description";
      const newValue = updateData.description;
      user = await User.update({ user_id, updateDataField, newValue });
    }

    return user;
  };

  static getUsers = async () => {
    const users = await User.findAll();
    return users;
  };

  static getUserInfo = async ({ user_id }) => {
    const user = await User.findById({ user_id });
    if (!user) {
      const errorMessage = "이메일 가입한 적이 없습니다.";
      return { errorMessage };
    }
    return user;
  };

  static getUser = async ({ email, password }) => {
    const user = await User.findByEmail(email);
    const hashedPassword = hashPassword(password);

    if (!user) {
      const errorMessage = "해당 이메일 가입 내역이 없습니다.";
      return { errorMessage };
    } else if (user.password === hashedPassword) {
      const token = makeToken({ user_id: user.id });

      const id = user.id;
      const name = user.name;
      const description = user.description;

      const loginUser = {
        token,
        id,
        email,
        name,
        description,
        errorMessage: null,
      };
      return loginUser;
    } else {
      const errorMessage = "비밀번호가 틀립니다 ㅠㅠ";
      return { errorMessage };
    }
  };

  static addUser = async ({ email, name, password }) => {
    // 회원가입 이메일 중복 확인
    const user = await User.findByEmail(email);
    if (user) {
      const errorMessage = "이 이메일은 사용중입니다.";
      // 배열로 넘겨줌!!
      return { errorMessage };
    }

    const hashedPassword = hashPassword(password);

    const id = uuidv4();
    const newUser = {
      email,
      password: hashedPassword,
      name,
      id,
    };
    const createdNewUser = await User.create(newUser);

    createdNewUser.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewUser;
  };
}

module.exports = userAuthService;
