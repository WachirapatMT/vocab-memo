const { MongoClient } = require("mongodb");
const dbConfig = require("config").get("dbConfig");

const MONGO_URL = `mongodb://${dbConfig.username}:${dbConfig.password}@${dbConfig.hostname}:${dbConfig.port}/${dbConfig.dbName}`;

const MongoConnection = function () {
  let db = null;

  async function init() {
    try {
      const client = await MongoClient.connect(MONGO_URL, {
        useNewUrlParser: true,
      });
      db = client.db(dbConfig.dbName);
      return db;
    } catch (err) {
      console.log(err);
    }
  }

  async function getConnection() {
    if (db) {
      return db;
    } else {
      return init();
    }
  }

  return {
    getConnection,
  };
};

module.exports = MongoConnection();
