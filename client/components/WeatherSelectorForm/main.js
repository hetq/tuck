import WeatherDateInput from '@/components/WeatherDateInput'
import WeatherCityInput from '@/components/WeatherCityInput'

const props = {
  value: {
    type: Object,
    default: () => ({})
  }
}

const computed = {
  dateValue: {
    get () {
      return this.value.date
    },
    set (date) {
      this.update('date', date)
    }
  },
  cityValue: {
    get () {
      return this.value.city
    },
    set (city) {
      this.update('city', city)
    }
  }
}

const methods = {
  update (field, value) {
    this.$emit('input', { ...this.value, [field]: value })
  }
}

export default {
  name: 'WeatherSelectorForm',
  props,
  computed,
  components: {
    WeatherDateInput,
    WeatherCityInput
  },
  methods
}
