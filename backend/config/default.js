require('dotenv').config()

module.exports = {
  appConfig: {
    port: process.env.PORT || 3001,
  },
  authConfig: {
    saltRound: parseInt(process.env.SALT_ROUND) || 10,
    jwtLifetime: parseInt(process.env.JWT_LIFETIME) || 86400,
    jwtSecret: process.env.JWT_SECRET || "secret",
  },
  dbConfig: {
    username: process.env.DB_USERNAME || "user",
    password: process.env.DB_PASSWORD || "password",
    hostname: process.env.DB_HOST || "mongodb",
    port: process.env.DB_PORT || "27017",
    dbName: process.env.DB_NAME || "vocabmemo",
    userCollection: process.env.USER_COLLECTION || "user",
    wordsetCollection: process.env.WORDSET_COLLECTION || "wordset",
  },
};
