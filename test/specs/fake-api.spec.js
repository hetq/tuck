import { serial as test } from 'ava'

import 'ky-universal'

import { acquireToken, createUser } from '@/api'
import { users } from '@/api/db'

test('login (ok)', async (t) => {
  const nyx = users[0]

  const formData = {
    email: nyx.email,
    password: nyx.password
  }

  await t.notThrowsAsync(acquireToken(formData))
})

test('login (not authorized)', async (t) => {
  const nyx = users[0]

  const formData = {
    email: nyx.email,
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
  const nyx = users[0]

  const formData = {
    name: 'Venus',
    email: nyx.email,
    password: 'passw0rd'
  }

  await t.throwsAsync(
    createUser(formData),
    { message: /conflict/i }
  )
})
