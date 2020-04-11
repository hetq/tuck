// assets

const stats = [
  {
    timestamp: 1485799200,
    temperature: 261.45
  },
  {
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

// helpers

const prop = key => obj => obj[key]

const formatTimestamp = (ts) => {
  const matches = new Date(ts * 1000)
    .toISOString()
    .match(/T([0-9:]{5})./)

  return matches[1]
}

//

const computed = {
  statPoints () {
    return this.stats
      .map(prop('temperature'))
  },
  statLabels () {
    return this.stats
      .map(prop('timestamp'))
      .map(formatTimestamp)
  }
}

const data = () => ({
  form: {
    date: new Date().toISOString().substr(0, 10),
    city: null
  },
  stats,
  cities: [
    'Moscow',
    'New York',
    'Sydney'
  ],
  modal: false
})

// expose component

export default {
  name: 'WeatherCard',
  data,
  computed
}
