const express = require("express");
const cors = require("cors");

const controller = require("./controllers");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello Wolrd");
});

// word-set endpoint
app.get("/word-set", controller.WordSet.getWordSets);
app.get("/word-set/:id", controller.WordSet.getWordSetById);
app.post("/word-set", controller.WordSet.createWordSet);
app.patch("/word-set/:id", controller.WordSet.updateWordSetById);
app.delete("/word-set/:id", controller.WordSet.deleteWordSetById);

app.post("/word-set/:id/vocaburaly", controller.WordSet.addVocaburaly);
app.delete(
  "/word-set/:id/vocaburaly/:vocabId",
  controller.WordSet.deleteVocaburaly,
);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
