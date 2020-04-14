import RemoteData from '@/types/RemoteData'

//

const props = {
  data: {
    type: Object,
    default: () => RemoteData.NotAsked
  }
}

const computed = {
  value () {
    const { data } = this

    return data.isSuccess()
      // ensure correct output type
      ? data.value
      : null
  }
}

export default {
  name: 'WeatherChart',
  props,
  computed
}
