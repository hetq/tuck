import jwt from 'jsonwebtoken'

import { User as api } from '@/api'

import Maybe from '@/types/Maybe'
import RemoteData from '@/types/RemoteData'

// helpers

const { NotAsked, Loading, Success, Failure } = RemoteData
const { Nothing, Just } = Maybe

const noop = () => null

const maybeFromRemote = data =>
  data.cata({
    NotAsked: Maybe.empty,
    Loading: Maybe.empty,
    Success: Maybe.of,
    Failure: Maybe.empty
  })

//

const storeToken = token =>
  localStorage.setItem('token', token)

const getStoredToken = () =>
  localStorage.getItem('token')

const dropStoredToken = () =>
  localStorage.removeItem('token')

// store parts

export const state = () => ({
  status: NotAsked
})

export const getters = {
  token (state) {
    const storedToken = Maybe.fromOptional(getStoredToken())

    return maybeFromRemote(state.status)
      .alt(storedToken)
  },
  payload (state, { token }) {
    return token.map(jwt.decode)
  },
  error (state) {
    const { status } = state
    return Failure.is(status)
      ? Just(status.error)
      : Nothing
  },
  isLoading (state) {
    return Loading.is(state.status)
  },
  isSuccess (state) {
    return Success.is(state.status)
  }
}

export const mutations = {
  UPDATE (state, status) {
    state.status = status

    status.cata({
      NotAsked: noop,
      Loading: noop,
      Success: storeToken,
      Failure: noop
    })
  },
  RESET (state) {
    dropStoredToken()
    state.status = NotAsked
  }
}

export const actions = {
  login ({ commit }, formData) {
    commit('UPDATE', Loading)

    return api
      .acquireToken(formData)
      .then(Success)
      .catch(Failure)
      .then(res => commit('UPDATE', res))
  },
  reset ({ commit }) {
    commit('RESET')

    // actions should return promises
    return Promise.resolve()
  }
}
