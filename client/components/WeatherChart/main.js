// helpers

const prop = key => obj => obj[key]

const formatTimestamp = (ts) => {
  const matches = new Date(ts * 1000)
    .toISOString()
    .match(/T([0-9:]{5})./)

  return matches[1]
}

//

const props = {
  isLoading: {
    type: Boolean,
    default: false
  },
  timeSeries: {
    type: Array,
    default: () => []
  }
}

const computed = {
  value () {
    return this.timeSeries
      .map(prop('value'))
  },
  labels () {
    return this.timeSeries
      .map(prop('time'))
      .map(formatTimestamp)
  }
}

export default {
  name: 'WeatherChart',
  props,
  computed
}
