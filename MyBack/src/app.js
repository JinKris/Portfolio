const express = require("express");
const cors = require("cors");

const indexRouter = require("./routers/indexRouter");
const userRouter = require("./routers/userRouter");
const projectRouter = require("./routers/projectRouter");
const app = express();
// CORS 에러 방지
app.use(cors());

// POST 요청 시 Body 사용을 위한 기본코드
// 폼형식을 허용해라
app.use(express.urlencoded({ extended: true }));
// json을 허용해라
app.use(express.json());

app.use("/", indexRouter);
app.use(userRouter);
app.use(projectRouter);
module.exports = app;
