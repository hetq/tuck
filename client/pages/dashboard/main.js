import WeatherDateInput from '@/components/WeatherDateInput'
import WeatherCityInput from '@/components/WeatherCityInput'
import WeatherChart from '@/components/WeatherChart'

// assets

const timeSeries = [
  {
    time: 1485799200,
    data: {
      temperature: 261.45
    }
  }, {
    time: 1485810000,
    data: {
      temperature: 261.41
    }
  },
  {
    time: 1485820800,
    data: {
      temperature: 261.76
    }
  },
  {
    time: 1485831600,
    data: {
      temperature: 261.46
    }
  },
  {
    time: 1485842400,
    data: {
      temperature: 260.981
    }
  },
  {
    time: 1485853200,
    data: {
      temperature: 262.308
    }
  },
  {
    time: 1485864000,
    data: {
      temperature: 263.76
    }
  },
  {
    time: 1485874800,
    data: {
      temperature: 264.182
    }
  },
  {
    time: 1485885600,
    data: {
      temperature: 264.67
    }
  }
]

//

const data = () => ({
  form: {
    date: undefined,
    city: undefined
  },
  timeSeries,
  isLoading: false
})

const computed = {
  statsFor () {
    const by = key =>
      ({ time, data }) => ({ time, value: data[key] })

    return key => this.timeSeries.map(by(key))
  }
}

const watch = {
  form: {
    handler () {
      console.log('Selector updated:', data)
      this.isLoading = true

      setTimeout(() => {
        this.isLoading = false
      }, 1000)
    },
    deep: true
  }
}

export default {
  name: 'DashboardPage',
  data,
  watch,
  computed,
  components: {
    WeatherChart,
    WeatherDateInput,
    WeatherCityInput
  }
}
