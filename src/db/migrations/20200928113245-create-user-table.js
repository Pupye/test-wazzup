'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_name: {
        type: Sequelize.STRING,
        allowNULL: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNULL: false
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users')
  }
}
