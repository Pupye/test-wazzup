const config = require('../src/config')
const chai = require('chai')
const chaiHttp = require('chai-http')
const ctx = {
  logger: {
    stream: undefined,
    error: (e) => { console.log(e) }
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
  describe('POST /api/notes', () => {
    it('should create note', (done) => {
      chai.request(app).post('/api/notes')
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
})
