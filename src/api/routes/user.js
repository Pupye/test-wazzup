const { celebrate, Joi, Segments } = require('celebrate')
const { userService } = require('../../services')

module.exports = (ctx, router) => {
  const { logger } = ctx
  router.get('/users', async (req, res) => {
    res.send({
      text: 'Success user'
    })
  })
  router.post('/users/signup', celebrate({
    [Segments.BODY]: Joi.object().keys({
      userName: Joi.string().required(),
      password: Joi.string().length(8).required()
    })
  }), async (req, res, next) => {
    const user = req.body
    try {
      await userService(ctx).createUser(user)
      res.status(201).end()
    } catch (error) {
      logger.error(error.stack)
      next(error)
    }
  })
}
