const config = require('../src/config')
const bcrypt = require('bcrypt')
const Encryptor = require('simple-encryptor')

const generateAccessId = () => {
  const encryptor = Encryptor({
    key: config.secrets.sharingSecret,
    hmac: false
  })
  const encrypted = encryptor.encrypt({
    sharingKey: 'sharing 1 1',
    noteId: 1,
    authorId: 1
  })
  const accessId = encrypted
    .replace(/\+/g, config.replacer.plus)
    .replace(/\//g, config.replacer.slash)
    .replace(/=/g, config.replacer.eq)
  return accessId
}

const accessId = generateAccessId()
module.exports = {
  logger: {
    stream: undefined,
    error: (e) => { }
  },
  accessId: accessId,
  redisClient: {
    get: async (sharingKey) => {
      if (sharingKey === 'sharing 1 1') {
        return accessId
      }
    },
    set: async () => { }
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
