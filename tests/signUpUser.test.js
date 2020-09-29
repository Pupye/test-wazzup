const chai = require('chai')
const chaiHttp = require('chai-http')

const ctx = {
  logger: {
    stream: undefined
  }
}
const app = require('../src/app')(ctx)

const { expect } = chai
chai.use(chaiHttp)

describe('users', () => {
  const user = {
    userName: 'test_',
    password: 'test1234'
  }
  describe('POST /api/users/signup', () => {
    it('should signup user', (done) => {
      chai.request(app)
        .post('/api/users/signup')
        .set('Content-Type', 'application/json')
        .send(user)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          expect(res).to.have.status(201)
          done()
        })
    })
  })
  describe('POST /api/users/signup', () => {
    it('should reject body without username', (done) => {
      chai.request(app)
        .post('/api/users/signup')
        .set('Content-Type', 'application/json')
        .send({
          password: user.password
        })
        .end((err, res) => {
          if (err) {
            done(err)
          }
          expect(res).to.have.status(400)
          done()
        })
    })
  })
  describe('POST /api/users/signup', () => {
    it('should reject body without password', (done) => {
      chai.request(app)
        .post('/api/users/signup')
        .set('Content-Type', 'application/json')
        .send({
          userName: user.userName
        })
        .end((err, res) => {
          if (err) {
            done(err)
          }
          expect(res).to.have.status(400)
          done()
        })
    })
  })
  describe('POST /api/users/signup', () => {
    it('should reject body with short password', (done) => {
      chai.request(app)
        .post('/api/users/signup')
        .set('Content-Type', 'application/json')
        .send({
          userName: user.userName,
          password: 'short'
        })
        .end((err, res) => {
          if (err) {
            done(err)
          }
          expect(res).to.have.status(400)
          done()
        })
    })
  })
})


