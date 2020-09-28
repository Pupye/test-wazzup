const dotenv = require('dotenv')
const result = dotenv.config()

if (result.error) {
  console.log(result)
  throw result.error
}

module.exports = {
  server: {
    port: process.env.PORT,
    host: process.env.HOST
  }
}
