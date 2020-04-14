import * as D from 'date-fns'

import RemoteData from '@/types/RemoteData'

//

const DATE_FORMAT = 'hh:mm, dd MMM'

//

const props = {
  data: {
    type: Object,
    default: () => RemoteData.Loading
  },
  metrics: {
    type: Array,
    default: () => []
  }
}

const computed = {
  timeSeries () {
    const { data } = this

    return data.isSuccess()
      ? data.value
      : null
  },
  labelOf () {
    return ({ time }) => D.format(time, DATE_FORMAT)
  }
}

export default {
  name: 'WeatherTimeline',
  props,
  computed
}
