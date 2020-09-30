'use strict'
const bcrypt = require('bcrypt')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      userName: 'test',
      password: bcrypt.hashSync('testtest', 1)
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
}
