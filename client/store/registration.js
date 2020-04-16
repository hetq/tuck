import { User as api } from '@/api'

import Maybe from '@/types/Maybe'
import RemoteData from '@/types/RemoteData'

// helpers

const { Loading, Failure } = RemoteData
const { Nothing, Just } = Maybe

// store parts

export const state = () => ({
  status: RemoteData.NotAsked
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
  }
}

export const mutations = {
  UPDATE (state, res) {
    state.status = res
  },
  RESET (state) {
    state.status = RemoteData.NotAsked
  }
}

export const actions = {
  submit ({ commit }, formData) {
    commit('UPDATE', RemoteData.Loading)

    return api
      .createUser(formData)
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
