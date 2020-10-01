const bcrypt = require('bcrypt')
const UserError = require('../errors/userError')
const jwt = require('jsonwebtoken')
module.exports = (ctx) => {
  const { db, config, redisClient } = ctx

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
    },
    loginUser: async (user) => {
      const exists = await db.User.findOne({
        where: { userName: user.userName }, raw: true
      })
      if (!exists) {
        throw new UserError('incorrect userName or password', 403)
      }
      const same = await bcrypt.compare(user.password, exists.password)
      if (!same) {
        throw new UserError('incorrect userName or password', 403)
      }
      delete exists.password
      const authToken = jwt.sign(exists, config.secrets.accessToken)
      const whilteListKey = `${exists.id} white list`
      await redisClient.append(whilteListKey, ' ' + authToken)
      return authToken
    }
  }
}
