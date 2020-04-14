import { mapGetters, mapActions } from 'vuex'

import * as R from 'ramda'
import * as D from 'date-fns'

import RemoteData from '@/types/RemoteData'

import WeatherDateInput from '@/components/WeatherDateInput'
import WeatherCityInput from '@/components/WeatherCityInput'
import WeatherChart from '@/components/WeatherChart'

// assets

const data = () => ({
  form: {
    date: D.formatISO(new Date(), { representation: 'date' }),
    city: 'Moscow'
  }
})

const computed = {
  timeRange () {
    const date = D.parseISO(this.form.date)

    const start = D.startOfDay(date)
    const end = D.endOfDay(date)

    return { start, end }
  },
  forecastData () {
    const { city } = this.form
    const { timeRange } = this

    return this.forecastBy({ city, timeRange })
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
    WeatherDateInput,
    WeatherCityInput
  },
  mounted
}
