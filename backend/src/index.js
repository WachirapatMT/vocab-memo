const express = require("express");
const cors = require("cors");

const appConfig = require("config").get("appConfig");

const middleware = require("./middlewares/authentication");
const controller = require("./controllers");

// Initialize express app
const app = express();

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Enable CORS
app.use(cors());

// user endpoint
app.use("/user", require("./routes/user"));

// word-set endpoint
app.use("/word-set", require("./routes/wordSet"));

// Error handler
require("./middlewares/errorHandler")(app);

app.listen(appConfig.port, () => {
  console.log(`Server running on port ${appConfig.port}`);
});
