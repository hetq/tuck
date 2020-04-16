import { serial as test } from 'ava'

import sinon from 'sinon'

import db from '@/vendor/db-users'

import Maybe from '@/types/Maybe'
import RemoteData from '@/types/RemoteData'

import { actions, mutations, getters } from '@/store/registration'

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

test('actions:submit - Success', async (t) => {
  const { commit } = t.context

  const formData = {
    name: 'Venus',
    email: 'venus@yahoo.com',
    password: 'imyourvenus'
  }

  await actions.submit({ commit }, formData)

  t.true(commit.calledTwice)
  t.true(commit.alwaysCalledWith('UPDATE'))

  t.true(Loading.is(commit.firstCall.lastArg))
  t.true(Success.is(commit.secondCall.lastArg))
})

test('actions:submit - Failure', async (t) => {
  const { commit } = t.context

  const formData = USER

  await actions.submit({ commit }, formData)

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

  //

  apply(state, Success(null))

  t.deepEqual(
    state.status,
    Success(null)
  )
})

test('mutations:RESET', (t) => {
  const state = {
    status: Success(null)
  }

  //

  mutations.RESET(state)

  t.deepEqual(
    state.status,
    NotAsked
  )
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
