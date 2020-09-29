require('dotenv').config()

module.exports = {
  server: {
    port: process.env.PORT,
    host: process.env.HOST
  },
  saltRounds: parseInt(process.env.SALT_ROUNDS)
}
