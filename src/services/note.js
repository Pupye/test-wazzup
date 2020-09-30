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
    }
  }
}
