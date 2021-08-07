const jwt = require("jsonwebtoken");

const JWT_SECRET = "secret";

function authenticateUser(req, res, next) {
  console.log(req.header);
  let token = req.header("Authorization");
  try {
    token = token.split(" ")[1];
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data;
  } catch (err) {
    throw Error("Unauthorized header");
  }
  next();
}

module.exports = { authenticateUser };
