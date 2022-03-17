const app = require("./src/app");
const dotenv = require("dotenv");

dotenv.config();

PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, console.log(`${PORT}번 포트 오온!`));
