require('dotenv').config()

module.exports = {
  development: {
    username: 'dev',
    password: 'dev',
    database: 'database_dev',
    host: '127.0.0.1',
    port: '5432',
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
    username: 'dev',
    password: 'dev',
    database: 'database_dev',
    host: '127.0.0.1',
    port: '5432',
    dialect: 'postgres'
  }
}
