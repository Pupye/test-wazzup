const bcrypt = require('bcrypt')
module.exports = (ctx) => {
  const { db, config } = ctx

  return {
    createUser: async (user) => {
      const exists = await db.User.findOne({
        where: { userName: user.userName }
      })
      if (exists) {
        throw Error('username already taken')
      }
      user.password = await bcrypt.hash(user.password, config.saltRounds)
      await db.User.create(user)
    }
  }
}
