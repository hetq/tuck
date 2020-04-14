const props = {
  value: String,
  options: Array
}

const methods = {
  update (value) {
    this.$emit('input', value)
    this.isActive = false
  }
}

export default {
  name: 'WeatherCityInput',
  props,
  methods
}
