const options = [
  'Moscow',
  'New York',
  'Sydney'
]

const props = {
  value: {
    type: String,
    default: options[0]
  }
}

const data = () => ({
  options
})

const methods = {
  update (value) {
    this.$emit('input', value)
    this.isActive = false
  }
}

export default {
  name: 'WeatherCityInput',
  props,
  data,
  methods
}
