const { JsonWebTokenError } = require('jsonwebtoken')
const UserError = require('../userError')

const userErrorHandler = (err, req, res, next) => {
  if (err instanceof UserError) {
    res.status(err.status).send(err.message)
  } else {
    next(err)
  }
}

const jwtErrorHandler = (err, req, res, next) => {
  if (err instanceof JsonWebTokenError) {
    res.status(403).send(err.message)
  } else {
    next(err)
  }
}

const generalErrorHandler = (err, req, res, next) => {
  res.status(500).send(err.message)
}

module.exports = {
  generalErrorHandler,
  userErrorHandler,
  jwtErrorHandler
}
