const UserError = require('../errors/userError')
const Encryptor = require('simple-encryptor')

module.exports = (ctx) => {
  const { db, config, redisClient } = ctx
  const encryptor = Encryptor({
    key: config.secrets.sharingSecret,
    hmac: false
  })
  return {
    createNote: async (note, authorId) => {
      const exists = await db.User.findByPk(authorId)
      if (!exists) {
        throw new UserError('user does not exists', 403)
      }
      const userNote = {
        ...note,
        authorId
      }
      await db.Note.create(userNote)
    },
    getUserNote: async (noteId, authorId) => {
      const note = await db.Note.findOne({
        where: { id: noteId, authorId }
      })
      return note
    },
    getUserNotes: async (limit, offset, authorId) => {
      limit = isNaN(limit) ? 20 : limit
      offset = isNaN(offset) ? 0 : offset

      limit = Math.min(limit, 20) // takes care of curious people
      const notes = await db.Note.findAll({
        limit,
        offset,
        where: {
          authorId
        }
      })
      return notes
    },
    updateUserNote: async (noteId, updateFields, authorId) => {
      const updatedNotes = await db.Note.update(
        updateFields,
        {
          where: {
            id: noteId,
            authorId
          },
          returning: true
        }
      )
      if (updatedNotes[0] === 0) {
        throw new UserError('noting was updated', 403)
      }
      return updatedNotes[1][0]
    },
    deleteUserNote: async (noteId, authorId) => {
      await db.Note.destroy({
        where: {
          id: noteId,
          authorId
        }
      })
    },
    shareUserNote: async (noteId, authorId) => {
      const exists = await db.Note.findOne({
        where: {
          id: noteId,
          authorId
        }
      })
      if (!exists) {
        throw new UserError('note does not exists', 400)
      }
      const sharingKey = `sharing ${authorId}`
      let accessId = await redisClient.get(sharingKey)
      if (accessId) {
        return accessId
      } else {
        const encrypted = encryptor.encrypt({
          sharingKey,
          noteId,
          authorId
        })
        accessId = encrypted
          .replace(/\+/g, config.replacer.plus)
          .replace(/\//g, config.replacer.slash)
          .replace(/=/g, config.replacer.eq)
        await redisClient.set(sharingKey, accessId)
        return accessId
      }
    },
    getSharedNote: async (accessId) => {
      const regexPlus = new RegExp(config.replacer.plus, 'g')
      const regexSlash = new RegExp(config.replacer.slash, 'g')
      const regexEq = new RegExp(config.replacer.eq, 'g')
      const encrypted = accessId
        .replace(regexPlus, '+')
        .replace(regexSlash, '/')
        .replace(regexEq, '=')

      const accessPayload = encryptor.decrypt(encrypted)
      if (!accessPayload) {
        throw new UserError('invalid link', 403)
      }
      const checkWith = await redisClient.get(accessPayload.sharingKey)
      if (accessId !== checkWith) {
        throw new UserError('invalid link', 403)
      }
      const sharedNote = db.Note.findOne({
        where: {
          id: accessPayload.noteId,
          authorId: accessPayload.authorId
        }
      })
      return sharedNote
    }
  }
}
