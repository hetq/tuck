import { User as api } from '@/api'

import Maybe from '@/types/Maybe'
import RemoteData from '@/types/RemoteData'

// helpers

const { NotAsked, Loading, Failure, Success } = RemoteData
const { Nothing, Just } = Maybe

// store parts

export const state = () => ({
  status: NotAsked
})

export const getters = {
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
  UPDATE (state, res) {
    state.status = res
  },
  RESET (state) {
    state.status = NotAsked
  }
}

export const actions = {
  submit ({ commit }, formData) {
    commit('UPDATE', Loading)

    return api
      .createUser(formData)
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
