const bcrypt = require("bcrypt");

const hashPassword = async (password, num) => {
  const hashedPassword = await bcrypt.hash(password, num);
  return hashedPassword;
};

module.exports = hashPassword;
