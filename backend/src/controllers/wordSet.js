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
      .insertOne({ title, description, vocaburaly: [], user: username });
    res.send(result);
  } else {
    throw Error("No request body");
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
    throw Error("No request body");
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

async function addVocaburaly(req, res) {
  const db = await MongoConnection.getConnection();
  const { id } = req.params;

  const wordSet = await db
    .collection(dbConfig.wordsetCollection)
    .findOne({ _id: new ObjectId(id) });
  const length = wordSet.vocaburaly.length;

  const result = await db
    .collection(dbConfig.wordsetCollection)
    .updateOne(
      { _id: new ObjectId(id) },
      { $push: { vocaburaly: { id: (length + 1).toString(), ...req.body } } },
    );
  res.send(result);
}

async function updateVocaburaly(req, res) {
  const db = await MongoConnection.getConnection();
  const { id, vocaburalyId } = req.params;
  if (req.body) {
    Object.keys(req.body).map((key) => {
      req.body[`vocaburaly.$.${key}`] = req.body[key];
      delete req.body[key];
    });
    const result = await db
      .collection(dbConfig.wordsetCollection)
      .updateOne(
        { _id: new ObjectId(id), "vocaburaly.id": vocaburalyId },
        { $set: req.body },
      );
    res.send(result);
  } else {
    throw Error("No request body");
  }
}

async function deleteVocaburaly(req, res) {
  const db = await MongoConnection.getConnection();
  const { id, vocaburalyId } = req.params;
  const result = await db
    .collection(dbConfig.wordsetCollection)
    .updateOne(
      { _id: new ObjectId(id) },
      { $pull: { vocaburaly: { id: vocaburalyId } } },
    );
  res.send(result);
}

module.exports = {
  getWordSets,
  getWordSetById,
  createWordSet,
  updateWordSetById,
  deleteWordSetById,
  addVocaburaly,
  updateVocaburaly,
  deleteVocaburaly,
};
