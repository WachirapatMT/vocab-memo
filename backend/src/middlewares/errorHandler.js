module.exports = (app) => {

  app.use((req, res, next) => {
    const err = new Error('Endpoint Not Found')
    err.status = 404
    next(err)
  })

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
