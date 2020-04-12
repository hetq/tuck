import { mapState, mapGetters, mapActions } from 'vuex'

import WeatherDateInput from '@/components/WeatherDateInput'
import WeatherCityInput from '@/components/WeatherCityInput'
import WeatherChart from '@/components/WeatherChart'

// assets

const data = () => ({
  form: {
    date: new Date().toISOString().substr(0, 10),
    city: 'Moscow'
  }
})

const computed = {
  statsFor () {
    const by = key =>
      ({ time, data }) => ({ time, value: data[key] })

    return key => this.timeSeries.map(by(key))
  },
  timeSeries () {
    return this.data
  },
  ...mapState('weather', ['data']),
  ...mapGetters('weather', ['isLoading'])
}

const watch = {
  form: {
    handler () {
      this.update()
    },
    deep: true
  }
}

const methods = {
  update () {
    console.log('upd 1', this.form.city)

    this.load(this.form)
  },
  ...mapActions('weather', ['load'])
}

export default {
  name: 'DashboardPage',
  data,
  watch,
  computed,
  methods,
  components: {
    WeatherChart,
    WeatherDateInput,
    WeatherCityInput
  }
}
