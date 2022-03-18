import dotenv from "dotenv";
dotenv.config();

const jwt = require("jsonwebtoken");

const makeToken = (object) => {
  const token = jwt.sign(object, process.env.JWT_SECRET_KEY, {
    expiresIn: "24h",
  });
  // console.log(token);
  return token;
};

export { makeToken };
