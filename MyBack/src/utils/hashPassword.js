const crypto = require("crypto");

const hassPassword = (password) => {
  const hashedPassword = crypto
    .createHash("sha512")
    .update(password)
    .digest("hex");
  return hashedPassword;
};

module.exports = hassPassword;
