const UserError = require("../userError");

const userErrorHandler = (err, req, res, next) => {
  if (err instanceof UserError) {
    res.status(err.status).send(err.message)
  } else {
    next(err);
  }
}

const generalErrorHandler = (err, req, res, next) => {
  res.status(500).send(err.message)
}

module.exports = {
  generalErrorHandler,
  userErrorHandler
}
