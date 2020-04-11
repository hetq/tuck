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
  value: {
    type: Array,
    default: () => []
  }
}

const computed = {
  statPoints () {
    return this.value
      .map(prop('temperature'))
  },
  statLabels () {
    return this.value
      .map(prop('timestamp'))
      .map(formatTimestamp)
  }
}

export default {
  name: 'WeatherChart',
  props,
  computed
}
