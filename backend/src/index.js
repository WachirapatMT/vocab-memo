const appConfig = require("config").get("appConfig");

const express = require("express");
const cors = require("cors");
const path = require("path");

// Initialize express app
const app = express();

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Web UI
app.use(express.static(path.join(__dirname, "../build")));

// Enable CORS
app.use(cors());

// Initialize database
require("./datasources/mongodb").getConnection();

// Endpoint handler
app.use("/api/user", require("./routes/user"));
app.use("/api/word-set", require("./routes/wordSet"));

// Handle unmatch request with Web UI
app.get("*", function (req, res) {
  res.sendFile("index.html", {
    root: path.join(__dirname, "../build"),
  });
});

// Error handler
require("./middlewares/errorHandler")(app);

app.listen(appConfig.port, () => {
  console.log(`Server running on port ${appConfig.port}`);
});
