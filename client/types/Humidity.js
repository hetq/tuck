import { taggedSum } from 'daggy'

const Humidity = taggedSum('Humidity', {
  Relative: ['value']
})

Humidity.prototype.toString = function () {
  return this.cata({
    Relative: t => `${t} %`
  })
}

Humidity.prototype.toNumber = function () {
  return this.cata({
    Relative: Number
  })
}

export default Humidity
