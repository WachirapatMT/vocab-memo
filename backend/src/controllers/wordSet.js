const ObjectId = require("mongodb").ObjectId;
const dbConfig = require("config").get("dbConfig");

const MongoConnection = require("../datasources/mongodb");

async function getWordSets(req, res) {
  const { username } = req.user;
  const db = await MongoConnection.getConnection();
  const result = await db
    .collection(dbConfig.wordsetCollection)
    .find({ user: username })
    .toArray();
  res.send(result);
}

async function getWordSetById(req, res) {
  const { username } = req.user;
  const db = await MongoConnection.getConnection();
  const { id } = req.params;
  const result = await db
    .collection(dbConfig.wordsetCollection)
    .findOne({ _id: new ObjectId(id), user: username });
  res.send(result);
}

async function createWordSet(req, res) {
  const { username } = req.user;
  const db = await MongoConnection.getConnection();
  if (req.body) {
    const { title, description } = req.body;
    const result = await db
      .collection(dbConfig.wordsetCollection)
      .insertOne({ title, description, vocabulary: [], user: username });
    res.send(result);
  } else {
    res.status(400).send("Bad request");
  }
}

async function updateWordSetById(req, res) {
  const db = await MongoConnection.getConnection();
  const { id } = req.params;
  if (req.body) {
    const result = await db
      .collection(dbConfig.wordsetCollection)
      .updateOne({ _id: new ObjectId(id) }, { $set: req.body });
    res.send(result);
  } else {
    res.status(400).send("Bad request");
  }
}

async function deleteWordSetById(req, res) {
  const { username } = req.user;
  const db = await MongoConnection.getConnection();
  const { id } = req.params;
  const result = await db
    .collection(dbConfig.wordsetCollection)
    .deleteOne({ _id: new ObjectId(id), user: username });
  res.send(result);
}

async function addVocabulary(req, res) {
  const db = await MongoConnection.getConnection();
  const { id } = req.params;

  const wordSet = await db
    .collection(dbConfig.wordsetCollection)
    .findOne({ _id: new ObjectId(id) });
  const length = wordSet.vocabulary.length;

  const result = await db
    .collection(dbConfig.wordsetCollection)
    .updateOne(
      { _id: new ObjectId(id) },
      { $push: { vocabulary: { id: new ObjectId(), ...req.body } } },
    );
  res.send(result);
}

async function updateVocabulary(req, res) {
  const db = await MongoConnection.getConnection();
  const { id, vocabularyId } = req.params;
  if (req.body) {
    Object.keys(req.body).map((key) => {
      req.body[`vocabulary.$.${key}`] = req.body[key];
      delete req.body[key];
    });
    const result = await db
      .collection(dbConfig.wordsetCollection)
      .updateOne(
        { _id: new ObjectId(id), "vocabulary.id": vocabularyId },
        { $set: req.body },
      );
    res.send(result);
  } else {
    res.status(400).send("Bad request");
  }
}

async function deleteVocabulary(req, res) {
  const db = await MongoConnection.getConnection();
  const { id, vocabularyId } = req.params;
  const result = await db
    .collection(dbConfig.wordsetCollection)
    .updateOne(
      { _id: new ObjectId(id) },
      { $pull: { vocabulary: { id: vocabularyId } } },
    );
  res.send(result);
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
