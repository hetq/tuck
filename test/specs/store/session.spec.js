import { serial as test } from 'ava'

import sinon from 'sinon'

import jwt from 'jsonwebtoken'

import db from '@/vendor/db-users'

import Maybe from '@/types/Maybe'
import RemoteData from '@/types/RemoteData'

import { actions, mutations, getters } from '@/store/session'

//

const { NotAsked, Loading, Success, Failure } = RemoteData
const { Nothing, Just } = Maybe

//

const USER = {
  name: 'Nyx',
  email: 'nyx@yahoo.com',
  password: 'pwd'
}

// hooks

test.beforeEach(async (t) => {
  // context for actions
  t.context = {
    state: {},
    commit: sinon.spy(),
    dispatch: sinon.spy()
  }

  //
  localStorage.clear()

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

test('actions:login - Success', async (t) => {
  const { commit } = t.context

  const formData = {
    email: USER.email,
    password: USER.password
  }

  await actions.login({ commit }, formData)

  t.true(commit.calledTwice)
  t.true(commit.alwaysCalledWith('UPDATE'))

  t.true(Loading.is(commit.firstCall.lastArg))
  t.true(Success.is(commit.secondCall.lastArg))
})

test('actions:login - Failure', async (t) => {
  const { commit } = t.context

  const formData = {
    email: USER.email,
    password: 'not'
  }

  await actions.login({ commit }, formData)

  t.true(commit.calledTwice)
  t.true(commit.alwaysCalledWith('UPDATE'))

  t.true(Loading.is(commit.firstCall.lastArg))
  t.true(Failure.is(commit.secondCall.lastArg))
})

test('actions:reset', async (t) => {
  const { commit } = t.context

  await actions.reset({ commit })

  t.true(commit.calledOnceWith('RESET'))
})

// tests

test('mutations:UPDATE', (t) => {
  const state = {}
  const apply = mutations.UPDATE

  //

  apply(state, Loading)

  t.deepEqual(
    state.status,
    Loading
  )

  t.falsy(localStorage.getItem('token'))

  //

  apply(state, Success('xxx'))

  t.deepEqual(
    state.status,
    Success('xxx')
  )

  t.is(localStorage.getItem('token'), 'xxx')
})

test('mutations:RESET', (t) => {
  const state = {
    status: Success('xxx')
  }

  localStorage.setItem('token', 'xxx')

  //

  mutations.RESET(state)

  t.deepEqual(
    state.status,
    NotAsked
  )

  t.falsy(localStorage.getItem('token'))
})

test('getters:token - Success', (t) => {
  const status = Success('xxx')

  t.deepEqual(
    getters.token({ status }),
    Maybe.of('xxx')
  )
})

test('getters:token - Loading', (t) => {
  const status = Loading

  t.deepEqual(
    getters.token({ status }),
    Maybe.Nothing
  )
})

test('getters:token - NotAsked + localStorage', (t) => {
  localStorage.setItem('token', 'xxx')

  const status = NotAsked

  t.deepEqual(
    getters.token({ status }),
    Maybe.of('xxx')
  )
})

test('getters:payload', (t) => {
  const token = jwt.sign({ id: 1 }, 'SECRET')

  const res1 = getters
    .payload({}, { token: Just(token) })

  t.true(Just.is(res1))
  t.is(res1.value.id, 1)

  const res2 = getters
    .payload({}, { token: Nothing })

  t.is(res2, Nothing)
})

test('getters:error', (t) => {
  const err = new Error('bad')

  t.deepEqual(
    getters.error({ status: Loading }),
    Nothing
  )

  t.deepEqual(
    getters.error({ status: Failure(err) }),
    Just(err)
  )
})

test('getters:isLoading', (t) => {
  t.deepEqual(
    getters.isLoading({ status: Nothing }),
    false
  )

  t.deepEqual(
    getters.isLoading({ status: Loading }),
    true
  )

  t.deepEqual(
    getters.isLoading({ status: Success('ok') }),
    false
  )
})
