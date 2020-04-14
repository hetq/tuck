import { mapGetters, mapActions } from 'vuex'

import * as R from 'ramda'
import * as D from 'date-fns'

// import RemoteData from '@/types/RemoteData'

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
  seriesFor () {
    return (key) => {
      const valueOf = (x) => {
        return R.path(['data', key], x)
      }

      return this.forecastData
        .map(R.map(valueOf))
    }
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
