require('dotenv').config()

module.exports = {
  development: {
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres'
  },
  test: {
    username: 'dev',
    password: 'dev',
    database: 'database_dev',
    host: '127.0.0.1',
    port: '5432',
    dialect: 'postgres'
  },
  production: {
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres'
  }
}
