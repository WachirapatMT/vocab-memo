const express = require("express");
const cors = require("cors");

// const controller = require("./controllers");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Wolrd");
});

// word-set endpoint
// app.get("/word-set", controller.WordSet.getWordSets);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
