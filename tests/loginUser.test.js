const config = require('../src/config')
const chai = require('chai')
const chaiHttp = require('chai-http')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ctx = {
  logger: {
    stream: undefined,
    error: () => { }
  },
  db: {
    User: {
      findOne: async (userName) => {
        if (userName === 'notExists') {
          return undefined
        }
        return {
          id: 1,
          userName: 'test_',
          password: bcrypt.hashSync('testtest', 1)
        }
      }
    }
  },
  config
}
const app = require('../src/app')(ctx)

const { expect } = chai
chai.use(chaiHttp)

describe('login user', () => {
  const user = {
    userName: 'test_',
    password: 'testtest'
  }
  describe('POST /api/users/login', () => {
    it('should provide auth token', (done) => {
      chai.request(app).post('/api/users/login')
        .send(user)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          expect(res).to.have.status(200)
          expect(res.header).to.have.property('authorization')
          const decoded = jwt.decode(res.header.authorization)
          expect(decoded).to.have.property('id')
          expect(decoded).to.have.property('userName')
          expect(decoded.userName).to.eq(user.userName)
          done()
        })
    })
  })
  describe('POST /api/users/login', () => {
    it('should reject because of password', (done) => {
      chai.request(app).post('/api/users/login')
        .send({
          userName: user.userName,
          password: 'hello'
        })
        .end((err, res) => {
          if (err) {
            done(err)
          }
          expect(res).to.have.status(403)
          done()
        })
    })
  })
  describe('POST /api/users/login', () => {
    it('should reject because of non existent userName', (done) => {
      chai.request(app).post('/api/users/login')
        .send({
          userName: 'notExists',
          password: 'hello'
        })
        .end((err, res) => {
          if (err) {
            done(err)
          }
          expect(res).to.have.status(403)
          done()
        })
    })
  })
})
