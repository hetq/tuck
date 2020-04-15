import jwt from 'jsonwebtoken'

import { User as api } from '@/api'

import Maybe from '@/types/Maybe'
import RemoteData from '@/types/RemoteData'

// helpers

const { Loading, Failure } = RemoteData
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
  remoteToken: RemoteData.NotAsked
})

export const getters = {
  token (state) {
    const storedToken = Maybe.fromOptional(getStoredToken())

    return maybeFromRemote(state.remoteToken)
      .alt(storedToken)
  },
  payload (state, { token }) {
    return token.map(jwt.decode)
  },
  error (state) {
    const { remoteToken } = state
    return Failure.is(remoteToken)
      ? Just(remoteToken.error)
      : Nothing
  },
  isLoading (state) {
    return Loading.is(state.remoteToken)
  }
}

export const mutations = {
  UPDATE (state, res) {
    state.remoteToken = res

    res.cata({
      NotAsked: noop,
      Loading: noop,
      Success: storeToken,
      Failure: noop
    })
  },
  RESET (state) {
    dropStoredToken()
    state.remoteToken = RemoteData.NotAsked
  }
}

export const actions = {
  login ({ commit }, formData) {
    commit('UPDATE', RemoteData.Loading)

    return api
      .acquireToken(formData)
      .then(RemoteData.Success)
      .catch(RemoteData.Failure)
      .then(res => commit('UPDATE', res))
  },
  reset ({ commit }) {
    commit('RESET')

    // actions should return promises
    return Promise.resolve()
  }
}
