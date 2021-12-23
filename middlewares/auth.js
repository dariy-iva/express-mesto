const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const ForbiddenError = require("../errors/forbidden-err");

const JWT_SECRET = crypto.randomBytes(16).toString("hex");

module.exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new ForbiddenError("Необходимо авторизоваться");
  }

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new ForbiddenError("Необходимо авторизоваться"));
  }

  req.user = payload;
  next();
};

module.exports.JWT_SECRET = JWT_SECRET;
