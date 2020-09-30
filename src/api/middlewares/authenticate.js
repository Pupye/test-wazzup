module.exports = (ctx) => {
  return async (req, res, next) => {
    req.user = {
      id: 1
    }
    next()
  }
}
