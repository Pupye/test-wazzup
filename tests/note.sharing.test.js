const chai = require('chai')
const chaiHttp = require('chai-http')
const { describe } = require('mocha')
const ctx = require('./context')
const app = require('../src/app')(ctx)

const { expect } = chai
chai.use(chaiHttp)


describe('sharing note', () => {
  describe('POST /api/notes/:id/share', () => {
    it('should return share link', (done) => {
      chai.request(app).post(`/api/notes/${1}/share`)
        .set('authorization', `Bearer ${ctx.accessToken}`)
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

  describe('GET /api/note/:accessId/shared', () => {
    it('should return share link', (done) => {
      chai.request(app).get(`/api/note/${ctx.accessId}/shared`)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('title')
          expect(res.body).to.have.property('content')
          done()
        })
    })
  })
})
