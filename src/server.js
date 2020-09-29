const db = require('./db/models')
const config = require('./config')
const logger = require('./utils/logger')
const ctx = {
  db,
  config,
  logger
}

const startServer = async () => {
  const app = require('./app')(ctx)
  app.listen(config.server.port, config.server.host, () => {
    logger.info(`server is online at ${config.server.port}`)
  })
}

startServer()
