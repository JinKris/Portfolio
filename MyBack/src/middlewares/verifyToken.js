const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const veryfyToken = (req, res, next) => {
  const token = req.headers["x-api-key"];

  if (!token) {
    console.log("서비스 사용 요청이 있지만 토큰이 없습니다.");
    res.status(400).json({
      message: "로그인한 유저만 사용할 수 있습니다.",
    });
    return;
  }

  try {
    const jwtDecoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user_id = jwtDecoded.user_id;

    req.currentUserId = user_id;
    next();
  } catch (error) {
    res.status(400).json({
      messge: "토큰이 변형되었습니다!",
    });
    return;
  }
};

module.exports = veryfyToken;
