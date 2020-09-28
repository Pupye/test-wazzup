
module.exports = (ctx, router) => {
  router.get('/notes', async (req, res) => {
    res.send({
      text: 'Success note'
    })
  })
}
