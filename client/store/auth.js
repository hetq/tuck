import { createUser, acquireToken } from '@/api'

// status variants

export const statuses = {
  NONE: 'NONE',
  PENDING: 'PENDING',
  OK: 'OK' // with token
}

// helpers

const payloadFor = (status, data = null) => ({ status, data })

// store parts

export const state = () => {
  const token = localStorage.getItem('token')

  return token
    ? { status: statuses.OK, token }
    : { status: statuses.NONE }
}

export const mutations = {
  SET (state, { status, data }) {
    if (!statuses[status]) {
      throw new RangeError(`Unknown status: ${status}`)
    }

    state.status = status
    state.token = status === statuses.OK
      ? data.token
      : null
  }
}

export const actions = {
  login ({ commit }, formData) {
    const pass = (res) => {
      commit('SET', payloadFor(statuses.OK, res))
      //
      localStorage.setItem('token', res.token)
    }
    const fail = (err) => {
      commit('SET', payloadFor(statuses.NONE))
      return Promise.reject(err)
    }

    // loading
    commit('SET', payloadFor(statuses.PENDING))

    return acquireToken(formData)
      .then(pass)
      .catch(fail)
  },
  signup ({ commit, dispatch }, formData) {
    // automatically try to login
    const pass = res => dispatch('login', formData)
    const fail = (err) => {
      commit('SET', payloadFor(statuses.NONE))
      return Promise.reject(err)
    }

    // loading
    commit('SET', payloadFor(statuses.PENDING))

    return createUser(formData)
      .then(pass)
      .catch(fail)
  },
  logout ({ commit }) {
    commit('SET', payloadFor(statuses.NONE))
    localStorage.removeItem('token')

    return Promise.resolve()
  }
}
