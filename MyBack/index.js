const app = require("./src/app.js");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, console.log(`${PORT}번 포트 오온!`));
