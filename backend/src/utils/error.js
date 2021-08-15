module.exports = {
  BadRequestError(msg) {
    const err = new Error(msg);
    err.status = 400;
    return err;
  },

  UnauthorizedError(msg) {
    const err = new Error(msg);
    err.status = 401;
    return err;
  },

  NotFoundError(msg) {
    const err = new Error(msg);
    err.status = 404;
    return err;
  },
};
