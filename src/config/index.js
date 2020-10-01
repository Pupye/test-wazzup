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
  },
  jwtLifeTime: process.env.JWT_LIFETIME,
  db: {
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    hort: process.env.DB_HOST,
    port: process.env.DB_PORT
  }
}
