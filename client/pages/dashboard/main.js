import { mapGetters, mapActions } from 'vuex'

import * as R from 'ramda'
import * as D from 'date-fns'

import CITY_NAMES from '@/assets/city-names'
import WEATHER_METRICS from '@/assets/weather-metrics'

import TimeRangeInput from '@/components/TimeRangeInput'
import LocationInput from '@/components/LocationInput'

import WeatherChart from '@/components/WeatherChart'
import WeatherTimeline from '@/components/WeatherTimeline'

// assets

const data = () => ({
  form: {
    timeRange: {
      start: D.startOfToday(),
      end: D.endOfToday()
    },
    location: R.head(CITY_NAMES)
  },
  metrics: WEATHER_METRICS,
  cityNames: CITY_NAMES
})

const computed = {
  data () {
    return this.forecastOf(this.form.location)
  },
  timeScope () {
    const { min, max } = D

    return this.data
      .map(R.pluck('time'))
      .map(R.applySpec({ min, max }))
  },
  focusData () {
    const isWithin = ({ time }) =>
      D.isWithinInterval(time, this.form.timeRange)

    return this.data.map(R.filter(isWithin))
  },
  seriesFor () {
    return (key) => {
      const valueOf = R.path(['data', key, 'value'])
      return this.focusData.map(R.map(valueOf))
    }
  },
  ...mapGetters('weather', ['forecastOf'])
}

const methods = {
  update (location) {
    this.ensureForecastOf(location)
  },
  ...mapActions('weather', ['ensureForecastOf'])
}

function mounted () {
  this.ensureForecastOf(this.form.location)
}

export default {
  name: 'DashboardPage',
  data,
  computed,
  methods,
  components: {
    TimeRangeInput,
    LocationInput,
    WeatherChart,
    WeatherTimeline
  },
  mounted
}
