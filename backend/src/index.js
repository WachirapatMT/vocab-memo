const express = require("express");
const cors = require("cors");

const appConfig = require("config").get("appConfig");

const middleware = require("./middlewares/authentication");
const controller = require("./controllers");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/word-set", middleware.authenticateUser);

// user endpoint
app.post("/login", controller.User.login);
app.post("/user", controller.User.createUser);
app.get("/user", middleware.authenticateUser, controller.User.getUserInfo);

// word-set endpoint
app.get("/word-set", controller.WordSet.getWordSets);
app.get("/word-set/:id", controller.WordSet.getWordSetById);
app.post("/word-set", controller.WordSet.createWordSet);
app.patch("/word-set/:id", controller.WordSet.updateWordSetById);
app.delete("/word-set/:id", controller.WordSet.deleteWordSetById);
app.post("/word-set/:id/vocabulary", controller.WordSet.addVocabulary);
app.patch(
  "/word-set/:id/vocabulary/:vocabularyId",
  controller.WordSet.updateVocabulary,
);
app.delete(
  "/word-set/:id/vocabulary/:vocabularyId",
  controller.WordSet.deleteVocabulary,
);

app.listen(appConfig.port, () => {
  console.log(`Server running on port ${appConfig.port}`);
});
