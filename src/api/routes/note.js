const { celebrate, Joi, Segments } = require('celebrate')
const { noteService } = require('../../services')
const { authenticate } = require('../middlewares')
module.exports = (ctx, router) => {
  const { logger } = ctx
  router.use('/notes', authenticate(ctx))
  router.get('/notes', async (req, res) => {
    res.send({
      text: 'Success note'
    })
  })
  router.post('/notes', celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      content: Joi.string().required()
    })
  }), async (req, res, next) => {
    const note = req.body
    const user = req.user
    try {
      await noteService(ctx).createNote(note, user.id)
      res.status(201).end()
    } catch (error) {
      logger.error(error.stack)
      next(error)
    }
  })
}
