const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1] ?? "null";
  //console.log(token);

  if (!token) {
    next();
  } else {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    //console.log(decoded);
    req.user = decoded;
    next();
  }
};

module.exports = verifyToken;
