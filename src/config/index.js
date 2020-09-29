require('dotenv').config()

module.exports = {
  env: process.env.NODE_ENV,
  server: {
    port: process.env.PORT,
    host: process.env.HOST
  },
  saltRounds: parseInt(process.env.SALT_ROUNDS),
  jwt: {
    secret: process.env.JWT_SECRET
  }
}
