const express = require("express");

const indexRouter = require("./routers/indexRouter");
const userAuthRouter = require("./routers/userRouter");

const app = express();

// POST 요청 시 Body 사용을 위한 기본코드
// 폼형식을 허용해라
app.use(express.urlencoded({ extended: true }));
// json을 허용해라
app.use(express.json());

app.use(indexRouter);

app.use(userAuthRouter);
module.exports = app;
