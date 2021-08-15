const service = require("../services/wordSet.service");
const { BadRequestError } = require("../utils/error");

async function getWordSets(req, res, next) {
  try {
    const { username } = req.user;
    const result = await service.getWordSets(username);
    res.send(result);
  } catch (err) {
    next(err);
  }
}

async function getWordSetById(req, res, next) {
  try {
    const { username } = req.user;
    const { id } = req.params;
    const result = await service.getWordSetById(username, id);
    res.send(result);
  } catch (err) {
    next(err);
  }
}

async function createWordSet(req, res, next) {
  try {
    const { username } = req.user;
    if (req.body) {
      const { title, description } = req.body;
      const result = await service.createWordSet(username, title, description);
      res.send(result);
    } else {
      throw BadRequestError("Request body not found");
    }
  } catch (err) {
    next(err);
  }
}

async function updateWordSetById(req, res, next) {
  try {
    const { id } = req.params;
    if (req.body) {
      const result = await service.updateWordSetById(id, req.body);
      res.send(result);
    } else {
      throw BadRequestError("Request body not found");
    }
  } catch (err) {
    next(err);
  }
}

async function deleteWordSetById(req, res, next) {
  try {
    const { username } = req.user;
    const { id } = req.params;
    const result = await service.deleteWordSetById(username, id);
    res.send(result);
  } catch (err) {
    next(err);
  }
}

async function addVocabulary(req, res, next) {
  try {
    const { id } = req.params;
    if (req.body) {
      const result = await service.addVocabulary(id, req.body);
      res.send(result);
    } else {
      throw BadRequestError("Request body not found");
    }
  } catch (err) {
    next(err);
  }
}

async function updateVocabulary(req, res, next) {
  try {
    const { id, vocabularyId } = req.params;
    if (req.body) {
      Object.keys(req.body).map((key) => {
        req.body[`vocabulary.$.${key}`] = req.body[key];
        delete req.body[key];
      });
      const result = await service.updateVocabulary(id, vocabularyId, req.body);
      res.send(result);
    } else {
      throw BadRequestError("Request body not found");
    }
  } catch (err) {
    next(err);
  }
}

async function deleteVocabulary(req, res, next) {
  try {
    const { id, vocabularyId } = req.params;
    const result = await service.deleteVocabulary(id, vocabularyId);
    res.send(result);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getWordSets,
  getWordSetById,
  createWordSet,
  updateWordSetById,
  deleteWordSetById,
  addVocabulary,
  updateVocabulary,
  deleteVocabulary,
};
