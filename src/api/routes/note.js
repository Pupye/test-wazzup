const { celebrate, Joi, Segments } = require('celebrate')
const { noteService } = require('../../services')
const { authenticate } = require('../middlewares')
module.exports = (ctx, router) => {
  const { logger } = ctx
  router.use('/notes', authenticate(ctx))

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

  router.get('/notes', async (req, res, next) => {
    try {
      const { query } = req
      const { user } = req
      console.log(query)
      const notes = await noteService(ctx).getUserNotes(query.limit, query.offset, user.id)
      res.status(200).json(notes)
    } catch (error) {
      logger.error(error.stack)
      next(error)
    }
  })

  router.get('/notes/:id/note', async (req, res, next) => {
    try {
      const noteId = parseInt(req.params.id)
      const { user } = req
      const note = await noteService(ctx).getUserNote(noteId, user.id)
      res.status(200).json(note)
    } catch (error) {
      logger.error(error.stack)
      next(error)
    }
  })
}
