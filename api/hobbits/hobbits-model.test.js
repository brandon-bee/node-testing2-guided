const db = require('../../data/dbConfig')
const Hobbit = require('./hobbits-model')

test('it is the correct environment for the tests', () => {
  expect(process.env.DB_ENV).toBe('testing')
})

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
})

describe('Hobbit db access functions', () => {
  describe('Hobbit.getAll', () => {
    it('resolves to all hobbits in the hobbits table', async () => {
      const hobbits = await Hobbit.getAll()
      expect(hobbits.length).toBe(4)
    })
    it('resolves to the correct hobbit shapes', async () => {
      const hobbits = await Hobbit.getAll()
      expect(hobbits[0]).toHaveProperty('id')
      expect(hobbits[0]).toHaveProperty('name')
    })
  })

  describe('Hobbit.insert', () => {
    it('adds a new hobbit to the table', async () => {
      await Hobbit.insert({ name: 'bullroarer' })
      const hobbits = await Hobbit.getAll()
      expect(hobbits).toHaveLength(5)
    })
    it('resolves to the newly inserted hobbit', async () => {
      const newHobbit = await Hobbit.insert({ name: 'bullroarer' })
      expect(newHobbit).toMatchObject({ id: 5, name: 'bullroarer' })
    })
  })
})