import delay from 'delay'
import createError from 'http-errors'
import jwt from 'jsonwebtoken'

import { users } from './db'

// settings

const JWT_SECRET = 'SECRET'
const DELAY_TIME = 1000

// patch browser (for firefox , etc)

if (!Error.captureStackTrace) {
  Error.captureStackTrace = () => []
}

// helpers

const trim = str => str.trim()
const lower = str => str.toLowerCase()

const resolveD = value => delay(DELAY_TIME, { value })
const rejectD = value => delay.reject(DELAY_TIME, { value })

//

const getUserByEmail = email =>
  users.find(user => user.email === trim(lower(email)))

const addUser = (formData) => {
  const name = trim(formData.name)
  const email = trim(lower(formData.email))
  const password = formData.password

  users.push({ name, email, password })
}

const tokenFor = ({ name, email }) =>
  jwt.sign({ name, email }, JWT_SECRET)

// actions

export function acquireToken ({ email, password }) {
  const user = getUserByEmail(email)

  return user && user.password === password
    ? resolveD({ token: tokenFor(user) })
    : rejectD(createError(401))
}

export function createUser (formData) {
  if (getUserByEmail(formData.email)) {
    return rejectD(createError(409))
  }

  addUser(formData)

  return resolveD()
}
