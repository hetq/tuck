import { taggedSum } from 'daggy'

//

const throwRangeError = (message = 'Bad usage') => {
  throw new RangeError(message)
}

//

const Time = taggedSum('Time', {
  Point: ['timestamp'],
  Range: ['start', 'end']
})

Time.Point.fromSeconds = function (s) {
  return Time.Point(s * 1000)
}

Time.prototype.toNumber = function (that) {
  return this.cata({
    Point: t => t,
    Range: () => throwRangeError()
  })
}

Time.prototype.equals = function (that) {
  return this.cata({
    Point: t => that.cata({
      Point: t2 => t === t2,
      Range: () => false
    }),
    Range: (start, end) => that.cata({
      Point: () => false,
      Range: (start2, end2) =>
        start.equals(start2) &&
        end.equals(end2)
    })
  })
}

Time.prototype.gt = function (that) {
  return this.cata({
    Point: t => that.cata({
      Point: t2 => t > t2,
      Range: () => throwRangeError()
    }),
    Range: () => throwRangeError()
  })
}

Time.prototype.lte = function (that) {
  return !this.gt(that)
}

Time.prototype.gte = function (that) {
  return this.gt(that) || this.equals(that)
}

Time.prototype.isWithin = function (that) {
  return this.cata({
    Point: t => that.cata({
      Point: t2 => t === t2,
      Range: (start, end) =>
        start.lte(this) &&
        end.gte(this)
    }),
    Range: (start, end) => that.cata({
      Point: t => start === t && end === t,
      Range: (start2, end2) =>
        start.gte(start2) &&
        end.lte(end2)
    })
  })
}

//

export default Time
