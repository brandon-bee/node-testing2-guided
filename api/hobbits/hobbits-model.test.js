const Hobbit = require('./hobbits-model')
const db = require('../../data/dbConfig')

test('NODE_ENV is correct', () => {
  expect(process.env.NODE_ENV).toBe('testing')
})

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

describe('Hobbit model', () => {

  describe('Hobbit.getAll()', () => {
    let hobbits
    beforeEach(async () => {
      hobbits = await Hobbit.getAll()
    })
    test('returns all hobbits in table', () => {
      expect(hobbits).toHaveLength(4)
    })
    test('returned hobbits have id and name', () => {
      expect(hobbits[0]).toMatchObject({ id: 1, name: 'sam' })
    })
  })

  describe('Hobbit.getById(id)', () => {
    let hobbit
    beforeEach(async () => {
      hobbit = await Hobbit.getById(1)
    })
  })
})
