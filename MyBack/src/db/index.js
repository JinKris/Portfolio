const User = require("./model/User");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

const DB_URL =
  process.env.MONGODB_URL || "몽고디비 서버주소가 설정 안되 있음 ㅠ";

mongoose
  .connect(DB_URL)
  .then(() => console.log("몽고디비 오온"))
  .catch(() => console.log("몽고디비 실패 ㅠ"));

module.exports = User;
