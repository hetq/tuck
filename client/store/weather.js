import { forecast } from '@/api/Weather'

export const statuses = {
  NONE: 'NONE',
  LOADING: 'LOADING',
  OK: 'OK' // with data
}

export const state = () => {
  return {
    status: statuses.NONE,
    selector: null,
    data: null
  }
}

export const mutations = {
  SET_LOADING (state, { selector }) {
    state.status = statuses.LOADING
    state.selector = selector
  },
  SET_OK (state, { selector, data }) {
    state.status = statuses.OK
    state.selector = selector
    state.data = data
  }
}

export const getters = {
  byDate (state) {
    return date => state.data
  },
  isCityOf (state) {
    const selector = state.selector || {}
    return city => city === selector.city
  },
  isLoading (state) {
    return state.status === statuses.LOADING
  }
}

export const actions = {
  load ({ state, getters, commit }, selector) {
    if (getters.isCityOf(selector.city)) {
      return Promise.resolve()
    }

    const apply = data => commit('SET_OK', { selector, data })

    commit('SET_LOADING', { selector })

    return forecast(selector)
      .then(apply)
  }
}
