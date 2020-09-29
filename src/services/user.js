const bcrypt = require('bcrypt')
const UserError = require('../errors/userError')
module.exports = (ctx) => {
  const { db, config } = ctx

  return {
    createUser: async (user) => {
      const exists = await db.User.findOne({
        where: { userName: user.userName }
      })
      if (exists) {
        throw new UserError('username already taken')
      }
      user.password = await bcrypt.hash(user.password, config.saltRounds)
      await db.User.create(user)
    }
  }
}
