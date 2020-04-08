import { serial as test } from 'ava'

import sinon from 'sinon'
import 'ky-universal'

import { users } from '@/api/db'

import { actions, mutations, statuses, state } from '@/store/auth'

// hooks

test.beforeEach((t) => {
  // context for actions
  t.context = {
    state: {},
    commit: sinon.spy(),
    dispatch: sinon.spy()
  }

  //
  localStorage.clear()
})

// tests

test('state (unauthorized)', (t) => {
  const { status, token } = state()

  t.is(status, statuses.NONE)
  t.falsy(token)
})

test('state (authorized)', (t) => {
  localStorage.setItem('token', 'XXX')

  const { status, token } = state()

  t.is(status, statuses.OK)
  t.truthy(token)
})

test('mutations.SET', (t) => {
  const state = {}
  const callWith = (status, data) =>
    () => mutations.SET(state, { status, data })

  t.notThrows(callWith(statuses.NONE))
  t.is(state.status, statuses.NONE)

  t.notThrows(callWith(statuses.PENDING))
  t.is(state.status, statuses.PENDING)

  t.notThrows(callWith(statuses.OK, { token: 'TOKEN' }))
  t.is(state.status, statuses.OK)

  t.throws(callWith('UNKNOWN'))
  t.not(state.status, 'UNKNOWN')
})

test('actions.login (ok)', async (t) => {
  const { commit } = t.context

  const nyx = users[0]

  const formData = {
    email: nyx.email,
    password: nyx.password
  }

  //

  await actions.login(t.context, formData)

  //

  t.is(commit.callCount, 2)

  t.is(commit.firstCall.args[1].status, statuses.PENDING)
  t.is(commit.secondCall.args[1].status, statuses.OK)

  //

  t.truthy(localStorage.getItem('token'))
})

test('actions.login (failed)', async (t) => {
  const { commit } = t.context

  const nyx = users[0]

  const formData = {
    email: nyx.email,
    password: 'wrong'
  }

  //

  await t.throwsAsync(actions.login(t.context, formData))

  //

  t.is(commit.callCount, 2)

  t.is(commit.firstCall.args[1].status, statuses.PENDING)
  t.is(commit.secondCall.args[1].status, statuses.NONE)

  //
  t.falsy(localStorage.getItem('token'))
})

test('actions.signup (ok)', async (t) => {
  const { commit, dispatch } = t.context

  const formData = {
    name: 'Venus',
    email: 'venus@yahoo.com',
    password: 'passw0rd'
  }

  //

  await actions.signup(t.context, formData)

  //

  t.true(commit.calledOnceWith('SET', { status: 'PENDING', data: null }))
  t.true(dispatch.calledOnceWith('login'))
})

test('actions.signup (failed)', async (t) => {
  const { commit, dispatch } = t.context

  const formData = {
    name: 'Venus',
    email: 'venus@yahoo.com',
    password: 'passw0rd'
  }

  //

  await t.throwsAsync(actions.signup(t.context, formData))

  //

  t.is(commit.callCount, 2)

  t.is(commit.firstCall.args[1].status, 'PENDING')
  t.is(commit.secondCall.args[1].status, 'NONE')

  t.true(dispatch.notCalled)
})

test('actions.logout', async (t) => {
  const { commit } = t.context

  localStorage.setItem('token', 'XXX')

  await actions.logout(t.context)

  //

  t.true(commit.calledOnceWith('SET', { status: 'NONE', data: null }))

  t.falsy(localStorage.getItem('token'))
})
