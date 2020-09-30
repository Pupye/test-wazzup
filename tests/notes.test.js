const config = require('../src/config')
const chai = require('chai')
const chaiHttp = require('chai-http')
const jwt = require('jsonwebtoken')
const ctx = {
  logger: {
    stream: undefined,
    error: (e) => { }
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
    },
    Note: {
      create: async (note) => { }
    }
  },
  config
}
const app = require('../src/app')(ctx)

const { expect } = chai
chai.use(chaiHttp)


describe('note operations', () => {
  const note = {
    title: 'test',
    content: 'test note'
  }
  const user = {
    id: 1,
    userName: 'test'
  }
  const accessToken = jwt.sign(user, config.secrets.accessToken)
  describe('POST /api/notes', () => {
    it('should create note', (done) => {
      chai.request(app).post('/api/notes')
        .set('authorization', `Bearer ${accessToken}`)
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
        .set('authorization', `Bearer ${accessToken}`)
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
})
