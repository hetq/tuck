import PouchDB from 'pouchdb'

import memoryAdapter from 'pouchdb-adapter-memory'
import findPlugin from 'pouchdb-find'

PouchDB
  .plugin(findPlugin)
  .plugin(memoryAdapter)

// tweak when testing
const options = process.env.NODE_ENV === 'test'
  ? { adapter: 'memory' }
  : {}

export default new PouchDB('users', options)
