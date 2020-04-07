import { createUser, acquireToken } from '@/api'

// status variants

export const statuses = {
  NONE: 'NONE',
  PENDING: 'PENDING',
  FAILED: 'FAILED', // with error
  OK: 'OK' // with token
}

// helpers

const payloadFor = (status, data = null) => ({ status, data })

// store parts

export const state = () => ({
  status: statuses.NONE
})

export const mutations = {
  SET (state, { status, data }) {
    if (!statuses[status]) {
      throw new RangeError(`Unknown status: ${status}`)
    }

    state.status = status
    state.data = data
  }
}

export const actions = {
  login ({ commit }, formData) {
    const pass = res => commit('SET', payloadFor(statuses.OK, res))
    const fail = err => commit('SET', payloadFor(statuses.FAILED, err))

    // loading
    commit('SET', payloadFor(statuses.PENDING))

    return acquireToken(formData)
      .then(pass)
      .catch(fail)
  },
  signup ({ commit, dispatch }, formData) {
    // automatically try to login
    const pass = res => dispatch('login', formData)
    const fail = err => commit('SET', payloadFor(statuses.FAILED, err))

    // loading
    commit('SET', payloadFor(statuses.PENDING))

    return createUser(formData)
      .then(pass)
      .catch(fail)
  },
  logout () {
    throw new Error('Not Implemented')
  }
}
