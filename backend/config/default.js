module.exports = {
  appConfig: {
    port: process.env.PORT || 3001,
  },
  authConfig: {
    saltRound: process.env.SALT_ROUND || 10,
    jwtLifetime: process.env.JWT_LIFETIME || 86400,
    jwtSecret: process.env.JWT_SECRET || "secret",
  },
  dbConfig: {
    dbName: process.env.DB_NAME || "vocabmemo",
    userCollection: process.env.USER_COLLECTION || "user",
    wordSetCollection: process.env.WORDSET_COLLECTION || "wordset",
  },
};
