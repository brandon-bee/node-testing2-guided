// even if you are only testing a route
// even if you are testing only a single endpoint
// IMPORT THE WHOLE SERVER.JS!!!!!!
const server = require('./server')
const db = require('../../data/dbConfig')

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
