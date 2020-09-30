const config = require('../src/config')
const bcrypt = require('bcrypt')

module.exports = {
  logger: {
    stream: undefined,
    error: (e) => { }
  },
  redisClient: {
    get: () => { },
    set: () => { }
  },
  db: {
    User: {
      findByPk: async () => 'found',
      findOne: async (params) => {
        if (params.where.userName === 'notExists') {
          return undefined
        }
        return {
          id: 1,
          userName: 'test_',
          password: bcrypt.hashSync('testtest', 1)
        }
      },
      create: async () => { }
    },
    Note: {
      create: async (note) => { },
      findOne: async (params) => {
        if (params.where.id !== 1) return {} //does not exists
        return {
          title: 'test',
          content: 'test'
        }
      },
      findAll: async () => {
        return []
      },
      update: async (updateFileds, options) => {
        if (options.where.id !== 1) {
          return [0, []]
        }
        return [[1], [updateFileds]]
      },
      destroy: async () => { }
    }
  },
  config
}
