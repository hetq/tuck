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

RemoteData.prototype.getOrElse = function (defaultValue) {
  return Success.is(this)
    ? this.value
    : defaultValue
}

//

RemoteData.prototype.isNotAsked = function () {
  return NotAsked.is(this)
}

RemoteData.prototype.isLoading = function () {
  return Loading.is(this)
}

RemoteData.prototype.isSuccess = function () {
  return Success.is(this)
}

RemoteData.prototype.isFailure = function () {
  return Failure.is(this)
}

//

export default RemoteData

export { NotAsked, Loading, Success, Failure }
