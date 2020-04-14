import * as D from 'date-fns'

import { RemoteData } from '@/types'

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
  labelOf () {
    return ({ time }) => D.format(time, DATE_FORMAT)
  }
}

export default {
  name: 'WeatherTimeline',
  props,
  computed
}
