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
    try {
      const note = req.body
      const user = req.user
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
    try {
      const note = req.body
      const user = req.user
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
      const notes = await noteService(ctx).getUserNotes(parseInt(query.limit), parseInt(query.offset), user.id)
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

  router.post('/notes/:id/note', celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string(),
      content: Joi.string()
    })
  }), async (req, res, next) => {
    try {
      const noteId = parseInt(req.params.id)
      const { user } = req
      const updateFields = req.body
      const updatedNote = await noteService(ctx).updateUserNote(noteId, updateFields, user.id)

      res.status(200).json(updatedNote)
    } catch (error) {
      logger.error(error.stack)
      next(error)
    }
  })

  router.delete('/notes/:id/note', async (req, res, next) => {
    try {
      const noteId = parseInt(req.params.id)
      const { user } = req
      await noteService(ctx).deleteUserNote(noteId, user.id)
      res.status(200).end()
    } catch (error) {
      logger.error(error.stack)
      next(error)
    }
  })

  router.post('/notes/:id/share', async (req, res, next) => {
    try {
      const noteId = parseInt(req.params.id)
      const { user } = req
      const accessId = await noteService(ctx).shareUserNote(noteId, user.id)
      res.status(201).json({
        accessId
      })
    } catch (error) {
      logger.error(error.stack)
      next(error)
    }
  })

  router.get('/note/:accessId/shared', async (req, res, next) => {
    try {
      const encrypted = req.params.accessId
      const note = await noteService(ctx).getSharedNote(encrypted)
      res.status(200).json(note)
    } catch (error) {
      logger.error(error.stack)
      next(error)
    }
  })
}
