const { celebrate, Joi, Segments } = require('celebrate')

module.exports = (ctx, router) => {
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
  }), async (req, res) => {
    res.status(201).end()
  })
}
