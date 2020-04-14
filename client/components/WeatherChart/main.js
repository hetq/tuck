import { RemoteData } from '@/types'

//

const props = {
  data: {
    type: Object,
    default: () => RemoteData.NotAsked
  }
}

export default {
  name: 'WeatherChart',
  props
}
