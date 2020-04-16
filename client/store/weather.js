import * as R from 'ramda'

import { RemoteData } from '@/types'
import { forecast } from '@/api/Weather'

//

export const state = () => {
  return {
    forecastMap: {}
  }
}

export const mutations = {
  SET_FORECAST_OF (state, { location, data }) {
    const update = R.assoc(location, data)
    state.forecastMap = update(state.forecastMap)
  }
}

export const getters = {
  forecastOf (state) {
    const getSafe = R.propOr(RemoteData.NotAsked)
    return location => getSafe(location, state.forecastMap)
  }
}

export const actions = {
  fetchForecastOf ({ commit }, location) {
    const { Loading, Success, Failure } = RemoteData

    const apply = (data) => {
      commit('SET_FORECAST_OF', { location, data })
      return data
    }

    apply(Loading)

    return forecast(location)
      .then(R.compose(apply, Success))
      .catch(R.compose(apply, Failure))
  },
  ensureForecastOf ({ getters, dispatch }, location) {
    const existingData = getters.forecastOf(location)

    return existingData.isNotAsked()
      ? dispatch('fetchForecastOf', location)
      : Promise.resolve(existingData)
  }
}
