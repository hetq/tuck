import { mapGetters, mapActions } from 'vuex'

import * as R from 'ramda'
import * as D from 'date-fns'

import RemoteData from '@/types/RemoteData'

import WeatherTimeRangeInput from '@/components/WeatherTimeRangeInput'
import WeatherCityInput from '@/components/WeatherCityInput'
import WeatherChart from '@/components/WeatherChart'
import WeatherTimeline from '@/components/WeatherTimeline'

// assets

const data = () => ({
  form: {
    timeRange: {
      start: D.startOfToday(),
      end: D.endOfToday()
    },
    city: 'Moscow'
  }
})

const computed = {
  forecastData () {
    return this.forecastBy(this.form)
  },
  timeSeries () {
    const { forecastData } = this

    if (RemoteData.Success.is(forecastData)) {
      return forecastData.value
    } else {
      return undefined
    }
  },
  timeSeriesFor () {
    return (key) => {
      const { forecastData } = this

      const dataPointFrom = R.applySpec({
        time: ({ time }) => time,
        value: ({ data }) => R.prop(key, data)
      })

      if (RemoteData.Success.is(forecastData)) {
        return forecastData.value.map(dataPointFrom)
      } else {
        return undefined
      }
    }
  },
  isLoading () {
    return RemoteData.Loading.is(this.forecastData)
  },
  ...mapGetters('weather', ['forecastBy'])
}

const methods = {
  update (city) {
    this.ensureForecastOf({ city })
  },
  ...mapActions('weather', ['ensureForecastOf'])
}

function mounted () {
  const { city } = this.form
  this.ensureForecastOf({ city })
}

export default {
  name: 'DashboardPage',
  data,
  computed,
  methods,
  components: {
    WeatherChart,
    WeatherTimeRangeInput,
    WeatherCityInput,
    WeatherTimeline
  },
  mounted
}
