const db = require('./db/models')
const config = require('./config')
const logger = require('./utils/logger')
const Redis = require('ioredis')
const startServer = async () => {
  const redisClient = new Redis(config.redis.port, config.redis.host)
  const ctx = {
    db,
    config,
    logger,
    redisClient
  }
  const app = require('./app')(ctx)
  app.listen(config.server.port, config.server.host, () => {
    logger.info(`server is online at ${config.server.port}`)
  })
}

startServer()
