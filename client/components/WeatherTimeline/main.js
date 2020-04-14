// helpers

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

}

export default {
  name: 'WeatherTimeline',
  props,
  computed
}
