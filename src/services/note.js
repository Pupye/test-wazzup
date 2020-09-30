module.exports = (ctx) => {
  const { db } = ctx

  return {
    createNote: async (note, id) => {
      await db.Note.create(note)
    }
  }
}
