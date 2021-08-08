const jwt = require("jsonwebtoken");
const authConfig = require("config").get("authConfig");

function authenticateUser(req, res, next) {
  let token = req.header("Authorization");
  try {
    token = token.split(" ")[1];
    const data = jwt.verify(token, authConfig.jwtSecret);
    req.user = data;
  } catch (err) {
    throw Error("Unauthorized header");
  }
  next();
}

module.exports = { authenticateUser };
