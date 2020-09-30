const UserError = require('../errors/userError')

module.exports = (ctx) => {
  const { db } = ctx

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
    }
  }
}
