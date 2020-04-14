import { mapGetters, mapActions } from 'vuex'

import * as R from 'ramda'
import * as D from 'date-fns'

// import RemoteData from '@/types/RemoteData'

import TimeRangeInput from '@/components/TimeRangeInput'

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
  },
  metrics: [
    {
      key: 'temperature',
      icon: 'temperature-celsius'
    },
    {
      key: 'humidity',
      icon: 'water-percent'
    },
    {
      key: 'pressure',
      icon: 'air-filter'
    }
  ],
  locationOptions: [
    'Moscow',
    'New York',
    'Sydney'
  ]
})

const computed = {
  data () {
    return this.forecastByCity(this.form.city)
  },
  timeScope () {
    const toScope = R.compose(
      R.converge(
        (min, max) => ({ min, max }),
        [R.head, R.last]
      ),
      R.pluck('time')
    )

    return this.data.map(toScope)
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
  ...mapGetters('weather', ['forecastByCity'])
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
    TimeRangeInput,
    WeatherCityInput,
    WeatherTimeline
  },
  mounted
}
