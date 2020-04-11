import WeatherChart from '@/components/WeatherChart'
import WeatherSelectorForm from '@/components/WeatherSelectorForm'

// assets

const stats = [
  {
    timestamp: 1485799200,
    temperature: 261.45
  }, {
    timestamp: 1485810000,
    temperature: 261.41
  },
  {
    timestamp: 1485820800,
    temperature: 261.76
  },
  {
    timestamp: 1485831600,
    temperature: 261.46
  },
  {
    timestamp: 1485842400,
    temperature: 260.981
  },
  {
    timestamp: 1485853200,
    temperature: 262.308
  },
  {
    timestamp: 1485864000,
    temperature: 263.76
  },
  {
    timestamp: 1485874800,
    temperature: 264.182
  },
  {
    timestamp: 1485885600,
    temperature: 264.67
  }
]

//

const data = () => ({
  form: undefined,
  stats
})

const watch = {
  form (data) {
    console.log('Selector updated:', data)
  }
}

// expose component

export default {
  name: 'WeatherCard',
  data,
  watch,
  components: {
    WeatherChart,
    WeatherSelectorForm
  }
}
