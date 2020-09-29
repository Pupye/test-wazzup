const routes = require('./api/routes')
const express = require('express')
const morgan = require('morgan')
const { errors } = require('celebrate')
const app = express()

module.exports = (ctx) => {
  app.get('/health', (req, res) => {
    res.status(200).end()
  })
  // configure routes, middlewares
  app.use(express.json())
  app.use(morgan('combined', { stream: ctx.logger.stream }))
  app.use('/api', routes(ctx))

  // errors
  app.use(errors())
  return app
}
