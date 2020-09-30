const { celebrate, Joi, Segments } = require('celebrate')
const { noteService } = require('../../services')
module.exports = (ctx, router) => {
  const { logger } = ctx
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
    const userId = 'id'
    try {
      await noteService(ctx).createNote(note, userId)
      res.status(201).end()
    } catch (error) {
      logger.error(error.stack)
      next(error)
    }
  })
}
