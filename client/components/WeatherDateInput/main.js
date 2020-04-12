const props = {
  value: String
}

const data = () => ({
  isActive: false
})

const methods = {
  update (value) {
    this.$emit('input', value)
    this.isActive = false
  }
}

export default {
  name: 'WeatherDateInput',
  props,
  data,
  methods
}
