const chai = require('chai')
const chaiHttp = require('chai-http')
const jwt = require('jsonwebtoken')
const { describe } = require('mocha')
const ctx = require('./context')
const app = require('../src/app')(ctx)

const { expect } = chai
chai.use(chaiHttp)


describe('sharing note', () => {
  const user = {
    id: 1,
    userName: 'test'
  }
  const accessToken = jwt.sign(user, ctx.config.secrets.accessToken)

  describe('POST /api/notes/:id/share', () => {
    it('should return share link', (done) => {
      chai.request(app).post(`/api/notes/${1}/share`)
        .set('authorization', `Bearer ${accessToken}`)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          expect(res).to.have.status(201)
          expect(res.body).to.have.property('accessId')
          done()
        })
    })
  })
})
