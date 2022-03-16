const express = require("express");

const indexRouter = require("./routers/indexRouter");

const app = express();

app.get("/", indexRouter);

module.exports = app;
