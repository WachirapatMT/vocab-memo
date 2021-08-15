const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const { UnauthorizedError } = require("../utils/error");
const MongoConnection = require("../datasources/mongodb");

const authConfig = config.get("authConfig");
const dbConfig = config.get("dbConfig");

async function getUser(username) {
  const db = await MongoConnection.getConnection();
  return db.collection(dbConfig.userCollection).findOne({ username });
}

async function createUser(username, password) {
  const salt = await bcrypt.genSalt(authConfig.saltRound);
  const hashPassword = await bcrypt.hash(password, salt);
  const user = { username, salt, password: hashPassword };

  const db = await MongoConnection.getConnection();
  return db.collection(dbConfig.userCollection).insertOne(user);
}

async function login(username, password) {
  const user = await getUser(username);
  if (user) {
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      throw UnauthorizedError("Unautorized");
    }
  } else {
    throw UnauthorizedError("Unautorized");
  }
  return generateToken(username);
}

function generateToken(username) {
  const token = jwt.sign(
    {
      username,
    },
    authConfig.jwtSecret,
    { expiresIn: authConfig.jwtLifetime },
  );
  return { username, token };
}

module.exports = {
  getUser,
  createUser,
  login,
};
