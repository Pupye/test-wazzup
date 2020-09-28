const db = 'hello'
const app = require('./app')(db)

const startServer = async () => {
  app.listen(8000, 'localhost')
}

startServer()
