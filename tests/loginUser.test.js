const chai = require('chai')
const chaiHttp = require('chai-http')
const jwt = require('jsonwebtoken')
const ctx = require('./context')
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
          expect(res.body).to.have.property('accessToken')
          const decoded = jwt.decode(res.body.accessToken)
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
