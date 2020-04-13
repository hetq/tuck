import { taggedSum } from 'daggy'

//

const Time = taggedSum('Time', {
  Timestamp: ['t']
})

Time.Timestamp.fromSeconds = function (s) {
  return Time.Timestamp(s * 1000)
}

Time.prototype.toNumber = function (that) {
  return this.cata({
    Timestamp: t => t
  })
}

Time.prototype.equals = function (that) {
  return this.toNumber() === that.toNumber()
}

Time.prototype.gt = function (that) {
  return this.toNumber() > that.toNumber()
}

Time.prototype.gte = function (that) {
  return this.equals(that) || this.gt(that)
}

//

export default Time
