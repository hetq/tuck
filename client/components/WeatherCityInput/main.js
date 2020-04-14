const options = [
  'Moscow',
  'New York',
  'Sydney'
]

const props = {
  value: String
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
