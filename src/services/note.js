module.exports = (ctx) => {
  const { db } = ctx

  return {
    createNote: async (note, authorId) => {
      const userNote = {
        ...note,
        authorId
      }
      await db.Note.create(userNote)
    }
  }
}
