import { taggedSum } from 'daggy'

//

const RemoteData = taggedSum('RemoteData', {
  NotAsked: [],
  Loading: [],
  Success: ['value'],
  Failure: ['error']
})

//

export default RemoteData
