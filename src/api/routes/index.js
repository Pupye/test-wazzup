const { Router } = require('express')
const setUserRoutes = require('./user')
const setNoteRoutes = require('./note')
const router = Router()

module.exports = (ctx) => {
  setUserRoutes(ctx, router)
  setNoteRoutes(ctx, router)
  return router
}
