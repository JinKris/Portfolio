const mongoose = require("mongoose");
const User = require("./models/User");

const dotenv = require("dotenv");
dotenv.config();

const DB_URL = process.env.MONGODB_URL || "MongoDB 서버 주소가 없음..";

mongoose
  .connect(DB_URL)
  .then(() => console.log("몽고디비 오온!"))
  .catch(() => console.log("몽고디비 실패 ㅠㅠ"));

module.exports = User;
