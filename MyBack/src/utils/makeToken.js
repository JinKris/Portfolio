const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const makeToken = (object) => {
  const token = jwt.sign(object, process.env.JWT_SECRET_KEY);
  return token;
};

module.exports = makeToken;
