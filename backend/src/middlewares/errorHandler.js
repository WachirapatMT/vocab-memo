const { NotFoundError } = require("../utils/error");

module.exports = (app) => {
  app.use((req, res, next) => {
    next(new NotFoundError("Endpoint not found"));
  });

  app.use((err, req, res, next) => {
    let statusCode = err.status || 500;
    res.status(statusCode);
    res.json({
      error: {
        status: statusCode,
        message: err.message || "Internal server error",
      },
    });
  });
};
