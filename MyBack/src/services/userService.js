const User = require("../db/index");
const { v4: uuidv4 } = require("uuid");
const hashPassword = require("../utils/hashPassword");
//uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

class userAuthService {
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
