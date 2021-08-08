const jwt = require("jsonwebtoken");
const authConfig = require("config").get("authConfig");

function authenticateUser(req, res, next) {
  let token = req.header("Authorization");
  try {
    token = token.split(" ")[1];
    const data = jwt.verify(token, authConfig.jwtSecret);
    req.user = data;
  } catch (err) {
    res.status(401).send("Unauthorized");
  }
  next();
}

module.exports = { authenticateUser };
