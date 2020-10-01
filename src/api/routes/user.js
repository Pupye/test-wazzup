const { celebrate, Joi, Segments } = require('celebrate')
const { userService } = require('../../services')
const { authenticate } = require('../middlewares')

module.exports = (ctx, router) => {
  const { logger } = ctx
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
  router.post('/users/login', celebrate({
    [Segments.BODY]: Joi.object().keys({
      userName: Joi.string().required(),
      password: Joi.string().required()
    })
  }), async (req, res, next) => {
    const user = req.body
    try {
      const accessToken = await userService(ctx).loginUser(user)
      res.status(200).json({
        accessToken
      })
    } catch (error) {
      logger.error(error.stack)
      next(error)
    }
  })

  router.post('/users/logout', async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization
      await userService(ctx).logoutUser(authHeader)
      res.status(200).end()
    } catch (error) {
      logger.error(error.stack)
      next(error)
    }
  })
  router.post('/users/logout/all', authenticate(ctx),
    async (req, res, next) => {
      try {
        const user = req.user
        await userService(ctx).logoutFromAll(user)
        res.status(200).end()
      } catch (error) {
        logger.error(error.stack)
        next(error)
      }
    })
}
