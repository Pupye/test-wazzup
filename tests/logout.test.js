const chai = require('chai')
const chaiHttp = require('chai-http')
const ctx = require('./context')
const app = require('../src/app')(ctx)

const { expect } = chai
chai.use(chaiHttp)

describe('logout user', () => {
  describe('POST /api/users/logout', () => {
    it('should logout user from api', (done) => {
      chai.request(app).post('/api/users/logout')
        .set('authorization', `Bearer ${ctx.accessToken}`)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          expect(res).to.have.status(200)
          done()
        })
    })
  })
  describe('POST /api/users/logout', () => {
    it('should logout user from api', (done) => {
      chai.request(app).post('/api/users/logout')
        .set('authorization', `Bearer invalid`)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          expect(res).to.have.status(403)
          done()
        })
    })
  })
  describe('POST /api/users/logout/all', () => {
    it('should logout user from api', (done) => {
      chai.request(app).post('/api/users/logout/all')
        .set('authorization', `Bearer ${ctx.accessToken}`)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          expect(res).to.have.status(200)
          done()
        })
    })
  })
})
