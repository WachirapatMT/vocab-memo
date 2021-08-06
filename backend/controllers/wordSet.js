const MongoConnection = require("../datasources/mongodb");

async function getWordSets(req, res) {
  const db = await MongoConnection.getConnection();

  const collection = db.collection("wordset");
  const result = await collection.find({}).toArray();
  console.log("find", result);
  res.send(result);
}

module.exports = {
  getWordSets,
};
