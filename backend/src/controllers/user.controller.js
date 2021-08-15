const service = require("../services/user.service");
const { BadRequestError, UnauthorizedError } = require("../utils/error");

async function getUserInfo(req, res, next) {
  try {
    const { username } = req.user;
    const result = await service.getUser(username);
    if (result) {
      res.send({ username: result.username });
    } else {
      throw UnauthorizedError("User not found");
    }
  } catch (err) {
    next(err);
  }
}

async function createUser(req, res, next) {
  try {
    if (req.body) {
      const { username, password } = req.body;
      const user = await service.getUser(username);
      if (user) {
        throw BadRequestError("User already exist");
      }
      await service.createUser(username, password);
      const result = await service.login(username, password);
      res.send(result);
    } else {
      throw BadRequestError("Request body not found");
    }
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    if (req.body) {
      const { username, password } = req.body;
      const result = await service.login(username, password);
      res.send(result);
    } else {
      throw BadRequestError("Request body not found");
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getUserInfo,
  createUser,
  login,
};
