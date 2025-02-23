const request = require('supertest')
const db = require('../data/dbConfig')
const server = require('./server')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
})

afterAll(async () => {
  await db.destroy()
})

describe('[GET] /hobbits', () => {
  it('should return a 200 OK status', async () => {
    const res = await request(server).get('/hobbits')
    expect(res.status).toBe(200)
  })
  it('should return JSON', async () => {
    const res = await request(server).get('/hobbits')
    expect(res.type).toBe('application/json')
  })
  it('should return a list of hobbits', async () => {
    const res = await request(server).get('/hobbits')
    expect(res.body).toHaveLength(4)
  })
})

describe('[POST] /hobbits', () => {
  it('should return a 422 if no name in payload', async () => {
    const res = await request(server).post('/hobbits').send({})
    expect(res.status).toBe(422)
  })
  it('should return a 201 OK status', async () => {
    const res = await request(server).post('/hobbits').send({ name: 'bullroarer' })
    expect(res.status).toBe(201)
  })
  it('should return the newly created hobbit', async () => {
    const res = await request(server).post('/hobbits').send({ name: 'bilbo' })
    expect(res.body).toMatchObject({ id: 5, name: 'bilbo' })
  })
})