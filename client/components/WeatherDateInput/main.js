const props = {
  value: {
    type: String,
    default: () => new Date().toISOString().substr(0, 10)
  }
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
