const { Router } = require('express')
const userRoutes = require('./user')
const noteRoutes = require('./note')
const router = Router()

module.exports = (ctx) => {
  userRoutes(ctx, router)
  noteRoutes(ctx, router)
  return router
}
