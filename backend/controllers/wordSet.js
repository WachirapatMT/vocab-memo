const ObjectId = require("mongodb").ObjectId;
const MongoConnection = require("../datasources/mongodb");

const COLLECTION = "wordset";

async function getWordSets(req, res) {
  const db = await MongoConnection.getConnection();
  const result = await db.collection(COLLECTION).find({}).toArray();
  res.send(result);
}

async function getWordSetById(req, res) {
  const db = await MongoConnection.getConnection();
  const { id } = req.params;
  const result = await db
    .collection(COLLECTION)
    .find({ _id: new ObjectId(id) })
    .toArray();
  res.send(result[0]);
}

async function createWordSet(req, res) {
  const db = await MongoConnection.getConnection();
  if (req.body) {
    const { title, description } = req.body;
    const result = await db
      .collection(COLLECTION)
      .insertOne({ title, description, vocaburaly: [] });
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
      .collection(COLLECTION)
      .updateOne({ _id: new ObjectId(id) }, { $set: req.body });
    res.send(result);
  } else {
    throw Error("No request body");
  }
}

async function deleteWordSetById(req, res) {
  const db = await MongoConnection.getConnection();
  const { id } = req.params;
  const result = await db
    .collection(COLLECTION)
    .deleteOne({ _id: new ObjectId(id) });
  res.send(result);
}

async function addVocaburaly(req, res) {
  const db = await MongoConnection.getConnection();
  const { id } = req.params;

  const wordSet = await db
    .collection(COLLECTION)
    .find({ _id: new ObjectId(id) })
    .toArray();
  const length = wordSet[0].vocaburaly.length;

  const result = await db
    .collection(COLLECTION)
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
      .collection(COLLECTION)
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
    .collection(COLLECTION)
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
