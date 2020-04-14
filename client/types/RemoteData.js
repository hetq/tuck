import { taggedSum } from 'daggy'

//

const RemoteData = taggedSum('RemoteData', {
  NotAsked: [],
  Loading: [],
  Success: ['value'],
  Failure: ['error']
})

const { NotAsked, Loading, Success, Failure } = RemoteData

//

RemoteData.prototype.map = function (transform) {
  if (Success.is(this)) {
    return Success(transform(this.value))
  } else {
    return this
  }
}

//

export default RemoteData

export { NotAsked, Loading, Success, Failure }
