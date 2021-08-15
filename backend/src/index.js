const appConfig = require("config").get("appConfig");

const express = require("express");
const cors = require("cors");

// Initialize express app
const app = express();

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Enable CORS
app.use(cors());

// Initialize database
require("./datasources/mongodb").getConnection();

// Endpoint handler
app.use("/user", require("./routes/user"));
app.use("/word-set", require("./routes/wordSet"));

// Error handler
require("./middlewares/errorHandler")(app);

app.listen(appConfig.port, () => {
  console.log(`Server running on port ${appConfig.port}`);
});
