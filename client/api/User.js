import createError from 'http-errors'
import jwt from 'jsonwebtoken'

import db from '@/vendor/db-users'

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

const delay = (val) => {
  const delayed = (resolve, reject) => {
    setTimeout(() => {
      val instanceof Error
        ? reject(val)
        : resolve(val)
    }, DELAY_TIME)
  }

  return new Promise(delayed)
}

const rejectUnauthorized = () =>
  Promise.reject(createError(401))

const rejectConflict = () =>
  Promise.reject(createError(409))

const tokenFor = ({ name, email }) =>
  jwt.sign({ name, email }, JWT_SECRET)

//

const getByEmail = (email) => {
  const selector = {
    email: trim(lower(email))
  }

  return db
    .find({ selector })
    .then(res => res.docs[0])
}

const create = (formData) => {
  const name = trim(formData.name)
  const email = trim(lower(formData.email))
  const password = formData.password

  return db.post({ name, email, password })
}

// actions

export function acquireToken ({ email, password }) {
  const assertAuthorized = user =>
    user && user.password === password
      ? user
      : rejectUnauthorized()

  const resolveToken = user =>
    ({ token: tokenFor(user) })

  return getByEmail(email)
    .then(assertAuthorized)
    .then(resolveToken)
    .then(delay)
}

export function createUser (formData) {
  const assertAvailable = user =>
    user
      ? rejectConflict()
      : user

  return getByEmail(formData.email)
    .then(assertAvailable)
    .then(() => create(formData))
    .then(delay)
}
