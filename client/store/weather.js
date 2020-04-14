import * as R from 'ramda'
import * as D from 'date-fns'

import RemoteData from '@/types/RemoteData'
import { forecast } from '@/api/Weather'

//

export const state = () => {
  return {
    forecastMap: {}
  }
}

export const mutations = {
  SET_FORECAST_OF (state, { city, data }) {
    const update = R.assoc(city, data)
    state.forecastMap = update(state.forecastMap)
  }
}

export const getters = {
  forecastBy (state, getters) {
    const isWithin = timeRange => ({ time }) => {
      return D.isWithinInterval(time, timeRange)
    }

    return ({ city, timeRange }) => {
      return getters
        .forecastByCity(city)
        .map(R.filter(isWithin(timeRange)))
    }
  },
  forecastByCity (state) {
    const propSafe = R.propOr(RemoteData.NotAsked)
    return city => propSafe(city, state.forecastMap)
  }
}

export const actions = {
  fetchForecastOf ({ commit }, { city }) {
    const { Loading, Success, Failure } = RemoteData

    const apply = (data) => {
      commit('SET_FORECAST_OF', { city, data })
      return data
    }

    apply(Loading)

    return forecast({ city })
      .then(R.compose(apply, Success))
      .catch(R.compose(apply, Failure))
  },
  ensureForecastOf ({ getters, dispatch }, { city }) {
    const { NotAsked } = RemoteData

    const existingData = getters.forecastByCity(city)

    return NotAsked.is(existingData)
      ? dispatch('fetchForecastOf', { city })
      : Promise.resolve(existingData)
  }
}
