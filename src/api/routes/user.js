
module.exports = (ctx, router) => {
  router.get('/users', async (req, res) => {
    res.send({
      text: 'Success user'
    })
  })
}
