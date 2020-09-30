'use strict'
const bcrypt = require('bcrypt')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{
      id: 1,
      userName: 'test',
      password: bcrypt.hashSync('testtest', 1)
    }])

    await queryInterface.bulkInsert('notes', [
      {
        title: 'test',
        content: 'testtest',
        authorId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'test',
        content: 'testtest',
        authorId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'test',
        content: 'testtest',
        authorId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'test',
        content: 'testtest',
        authorId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'test',
        content: 'testtest',
        authorId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'test',
        content: 'testtest',
        authorId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'test',
        content: 'testtest',
        authorId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'test',
        content: 'testtest',
        authorId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'test',
        content: 'testtest',
        authorId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'test',
        content: 'testtest',
        authorId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'test',
        content: 'testtest',
        authorId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'test',
        content: 'testtest',
        authorId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'test',
        content: 'testtest',
        authorId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'test',
        content: 'testtest',
        authorId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'test',
        content: 'testtest',
        authorId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'test',
        content: 'testtest',
        authorId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'test',
        content: 'testtest',
        authorId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'test',
        content: 'testtest',
        authorId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'test',
        content: 'testtest',
        authorId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'test',
        content: 'testtest',
        authorId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'test',
        content: 'testtest',
        authorId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'test',
        content: 'testtest',
        authorId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'test',
        content: 'testtest',
        authorId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'test',
        content: 'testtest',
        authorId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'test',
        content: 'testtest',
        authorId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('notes', null, {})
    await queryInterface.bulkDelete('users', null, {})
  }
}
