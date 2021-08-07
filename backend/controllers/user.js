const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const MongoConnection = require("../datasources/mongodb");

const COLLECTION = "user";
const SALT_ROUND = 10;
const LIFETIME = 24 * 60 * 60;
const JWT_SECRET = "secret";

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

  const salt = await bcrypt.genSalt(SALT_ROUND);
  user.salt = salt;
  user.password = await bcrypt.hash(password, salt);

  const db = await MongoConnection.getConnection();
  const result = await db.collection(COLLECTION).insertOne(user);
  res.send(result);
}

async function login(req, res) {
  const { username, password } = req.body;
  const user = await getUser(username);
  console.log(user);
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
  const result = await db.collection(COLLECTION).findOne({ username });
  console.log(result);
  return result;
}

function generateToken(username) {
  const token = jwt.sign(
    {
      username,
    },
    JWT_SECRET,
    { expiresIn: LIFETIME },
  );
  return { username, token };
}

module.exports = {
  getUserInfo,
  createUser,
  login,
};
