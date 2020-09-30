const chai = require('chai')
const chaiHttp = require('chai-http')
const ctx = require('./context')
const app = require('../src/app')(ctx)

const { expect } = chai
chai.use(chaiHttp)


describe('note operations', () => {
  const note = {
    title: 'test',
    content: 'test note'
  }
  describe('POST /api/notes', () => {
    it('should create note', (done) => {
      chai.request(app).post('/api/notes')
        .set('authorization', `Bearer ${ctx.accessToken}`)
        .send(note)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          expect(res).to.have.status(201)
          done()
        })
    })
  })

  describe('POST /api/notes', () => {

    it('should reject creation invalid body', (done) => {
      chai.request(app).post('/api/notes')
        .set('authorization', `Bearer ${ctx.accessToken}`)
        .send({
          title: note.title
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

  describe('POST /api/notes', () => {

    it('should reject creation invalid token', (done) => {
      chai.request(app).post('/api/notes')
        .set('authorization', `Bearer invalid`)
        .send({
          note
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

  describe('GET /api/notes/:id/note', () => {
    it('should get note with id', (done) => {
      chai.request(app).get(`/api/notes/${1}/note`)
        .set('authorization', `Bearer ${ctx.accessToken}`)
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

  describe('GET /api/notes/:id/note', () => {
    it('should get empty body', (done) => {
      chai.request(app).get(`/api/notes/${2}/note`) // suppose it does not exists
        .set('authorization', `Bearer ${ctx.accessToken}`)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          expect(res).to.have.status(200)
          expect(res.body).to.not.have.property('title')
          expect(res.body).to.not.have.property('content')
          done()
        })
    })
  })

  describe('GET /api/notes/:id/note', () => {
    it('should reject because of invalid token', (done) => {
      chai.request(app).get(`/api/notes/${1}/note`)
        .set('authorization', `Bearer token`)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          expect(res).to.have.status(403)
          done()
        })
    })
  })

  describe('GET /api/notes with query params', () => {
    it('should paginate notes', (done) => {
      chai.request(app).get(`/api/notes`)
        .set('authorization', `Bearer ${ctx.accessToken}`)
        .query({
          offset: 10,
          limit: 500
        })
        .end((err, res) => {
          if (err) {
            done(err)
          }
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('array')
          done()
        })
    })
  })

  describe('POST /api/notes/:id/note ', () => {
    it('should update note with id', (done) => {
      chai.request(app).post(`/api/notes/${1}/note`)
        .set('authorization', `Bearer ${ctx.accessToken}`)
        .send({
          title: 'new title',
          content: 'new content'
        })
        .end((err, res) => {
          if (err) {
            done(err)
          }
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('title')
          expect(res.body.title).to.be.eq('new title')
          done()
        })
    })
  })

  describe('POST /api/notes/:id/note ', () => {
    it('should reject because nothing was updated', (done) => {
      chai.request(app).post(`/api/notes/${2}/note`)
        .set('authorization', `Bearer ${ctx.accessToken}`)
        .send({
          title: 'new title',
          content: 'new content'
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

  describe('DELETE /api/notes/:id/note ', () => {
    it('should delete note', (done) => {
      chai.request(app).delete(`/api/notes/${1}/note`)
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
