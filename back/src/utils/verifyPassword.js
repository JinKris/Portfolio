import bcrypt from "bcrypt";

/**
 * const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );
    if (!isPasswordCorrect) {
      const errorMessage =
        "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
 */

const verifyPassword = async (password, userPassword) => {
  const isPasswordCorrect = await bcrypt.compare(password, userPassword);
  return isPasswordCorrect;
};

export { verifyPassword };
