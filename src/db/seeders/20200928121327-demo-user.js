'use strict'
const bcrypt = require('bcrypt')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{
      userName: 'test',
      password: bcrypt.hashSync('testtest', 1)
    }])

    const userIds = await queryInterface.sequelize.query(
      'SELECT id from users'
    )

    await queryInterface.bulkInsert('notes', [
      {
        title: 'test',
        content: 'testtest',
        authorId: userIds[0].id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'test',
        content: 'testtest',
        authorId: userIds[0].id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'test',
        content: 'testtest',
        authorId: userIds[0].id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'test',
        content: 'testtest',
        authorId: userIds[0].id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'test',
        content: 'testtest',
        authorId: userIds[0].id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'test',
        content: 'testtest',
        authorId: userIds[0].id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'test',
        content: 'testtest',
        authorId: userIds[0].id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'test',
        content: 'testtest',
        authorId: userIds[0].id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'test',
        content: 'testtest',
        authorId: userIds[0].id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'test',
        content: 'testtest',
        authorId: userIds[0].id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'test',
        content: 'testtest',
        authorId: userIds[0].id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'test',
        content: 'testtest',
        authorId: userIds[0].id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'test',
        content: 'testtest',
        authorId: userIds[0].id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'test',
        content: 'testtest',
        authorId: userIds[0].id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'test',
        content: 'testtest',
        authorId: userIds[0].id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'test',
        content: 'testtest',
        authorId: userIds[0].id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'test',
        content: 'testtest',
        authorId: userIds[0].id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'test',
        content: 'testtest',
        authorId: userIds[0].id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'test',
        content: 'testtest',
        authorId: userIds[0].id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'test',
        content: 'testtest',
        authorId: userIds[0].id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'test',
        content: 'testtest',
        authorId: userIds[0].id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'test',
        content: 'testtest',
        authorId: userIds[0].id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'test',
        content: 'testtest',
        authorId: userIds[0].id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'test',
        content: 'testtest',
        authorId: userIds[0].id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: 'test',
        content: 'testtest',
        authorId: userIds[0].id,
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
