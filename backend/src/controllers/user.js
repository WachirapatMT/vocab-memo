const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const MongoConnection = require("../datasources/mongodb");

const authConfig = config.get("authConfig");
const dbConfig = config.get("dbConfig");

async function getUserInfo(req, res) {
  res.send({ username: req.user.username });
}

async function createUser(req, res) {
  const { username, password } = req.body;
  let user = await getUser(username);
  if (user) {
    throw Error("This username already exists");
  }

  user = {};
  user.username = username;

  const salt = await bcrypt.genSalt(authConfig.saltRound);
  user.salt = salt;
  user.password = await bcrypt.hash(password, salt);

  const db = await MongoConnection.getConnection();
  const result = await db.collection(dbConfig.userCollection).insertOne(user);
  await login(req, res);
}

async function login(req, res) {
  const { username, password } = req.body;
  const user = await getUser(username);
  if (user) {
    try {
      const check = await bcrypt.compare(password, user.password);
      if (!check) {
        throw Error("Unauthorized");
      }
      res.send(generateToken(username));
    } catch (err) {
      throw err;
    }
  }
}

async function getUser(username) {
  const db = await MongoConnection.getConnection();
  const result = await db
    .collection(dbConfig.userCollection)
    .findOne({ username });
  return result;
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
  getUserInfo,
  createUser,
  login,
};
