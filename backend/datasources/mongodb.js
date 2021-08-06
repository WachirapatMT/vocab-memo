const { MongoClient } = require("mongodb");

const MONGO_URL =
  process.env.MONGO_URL || "mongodb://user:password@mongodb:27017/vocabmemo";
const DB_NAME = process.env.DB_NAME || "vocabmemo";

const MongoConnection = function () {
  let db = null;

  async function init() {
    try {
      const client = await MongoClient.connect(MONGO_URL, {
        useNewUrlParser: true,
      });
      db = client.db(DB_NAME);
      return db;
    } catch (err) {
      console.log(err);
    }
  }

  async function getConnection() {
    if (db) {
      console.log("connection existed");
      return db;
    } else {
      return init();
    }
  }

  return {
    getConnection,
  };
};

// async function init() {
//   try {
//     const client = await MongoClient.connect(mongoUrl, {
//       useNewUrlParser: true,
//     });
//     return client.db(dbName);
//   } catch (err) {
//     console.log(err);
//   }
// }

module.exports = MongoConnection();
