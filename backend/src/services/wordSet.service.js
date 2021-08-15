const ObjectId = require("mongodb").ObjectId;
const dbConfig = require("config").get("dbConfig");

const MongoConnection = require("../datasources/mongodb");

async function getWordSets(username) {
  const db = await MongoConnection.getConnection();
  return db
    .collection(dbConfig.wordsetCollection)
    .find({ user: username })
    .toArray();
}

async function getWordSetById(username, id) {
  const db = await MongoConnection.getConnection();
  return db
    .collection(dbConfig.wordsetCollection)
    .findOne({ _id: new ObjectId(id), user: username });
}

async function createWordSet(username, title, description) {
  const db = await MongoConnection.getConnection();
  return db
    .collection(dbConfig.wordsetCollection)
    .insertOne({ title, description, vocabulary: [], user: username });
}

async function updateWordSetById(id, data) {
  const db = await MongoConnection.getConnection();
  return db
    .collection(dbConfig.wordsetCollection)
    .updateOne({ _id: new ObjectId(id) }, { $set: data });
}

async function deleteWordSetById(username, id) {
  const db = await MongoConnection.getConnection();
  return db
    .collection(dbConfig.wordsetCollection)
    .deleteOne({ _id: new ObjectId(id), user: username });
}

async function addVocabulary(id, data) {
  const db = await MongoConnection.getConnection();
  return db
    .collection(dbConfig.wordsetCollection)
    .updateOne(
      { _id: new ObjectId(id) },
      { $push: { vocabulary: { id: new ObjectId(), ...data } } },
    );
}

async function updateVocabulary(id, vocabularyId, data) {
  const db = await MongoConnection.getConnection();
  return db
    .collection(dbConfig.wordsetCollection)
    .updateOne(
      { _id: new ObjectId(id), "vocabulary.id": new ObjectId(vocabularyId) },
      { $set: data },
    );
}

async function deleteVocabulary(id, vocabularyId) {
  const db = await MongoConnection.getConnection();
  return db
    .collection(dbConfig.wordsetCollection)
    .updateOne(
      { _id: new ObjectId(id) },
      { $pull: { vocabulary: { id: new ObjectId(vocabularyId) } } },
    );
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
