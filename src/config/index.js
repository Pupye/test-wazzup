require('dotenv').config()

module.exports = {
  env: process.env.NODE_ENV,
  server: {
    port: process.env.PORT,
    host: process.env.HOST
  },
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST
  },
  saltRounds: parseInt(process.env.SALT_ROUNDS),
  secrets: {
    accessToken: process.env.JWT_SECRET,
    sharingSecret: process.env.SHARING_SECRET
  },
  replacer: {
    plus: process.env.PLUS_REPLACE,
    slash: process.env.SLASH_REPLACE,
    eq: process.env.EQ_REPLACE
  }
}
