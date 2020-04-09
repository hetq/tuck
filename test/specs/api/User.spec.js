import { serial as test } from 'ava'

import db from '@/vendor/db-users'

import { acquireToken, createUser } from '@/api/User'

// assets

const USER = {
  name: 'Nyx',
  email: 'nyx@yahoo.com',
  password: 'pwd'
}

// hooks

test.beforeEach(async (t) => {
  await db.post(USER)
})

test.afterEach.always(async (t) => {
  await db
    .allDocs({ include_docs: true })
    .then((res) => {
      const make = row => ({
        _id: row.id,
        _rev: row.doc._rev,
        _deleted: true
      })

      return res.rows.map(make)
    })
    .then(deleteDocs => db.bulkDocs(deleteDocs))
})

//

test('login (ok)', async (t) => {
  const formData = {
    email: USER.email,
    password: USER.password
  }

  await t.notThrowsAsync(acquireToken(formData))
})

test('login (not authorized)', async (t) => {
  const formData = {
    email: USER.email,
    password: 'wrong'
  }

  await t.throwsAsync(
    acquireToken(formData),
    { message: /unauthorized/i }
  )
})

test('signup (ok)', async (t) => {
  const formData = {
    name: 'Venus',
    email: 'venus@yahoo.com',
    password: 'passw0rd'
  }

  await t.notThrowsAsync(createUser(formData))
})

test('signup (conflict)', async (t) => {
  const formData = {
    name: 'Venus',
    email: USER.email,
    password: 'passw0rd'
  }

  await t.throwsAsync(
    createUser(formData),
    { message: /conflict/i }
  )
})
