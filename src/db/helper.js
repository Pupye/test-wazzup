const bcrypt = require('bcrypt')
module.exports = {
  generateTestPass: () => {
    return bcrypt.hashSync('test', 1)
  }
}
