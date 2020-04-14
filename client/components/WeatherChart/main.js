import * as R from 'ramda'

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

    return data.isSuccess() && !R.isEmpty(data.value)
      // ensure correct output type
      ? R.map(Number, data.value || [])
      : null
  }
}

export default {
  name: 'WeatherChart',
  props,
  computed
}
