import { taggedSum } from 'daggy'

const Pressure = taggedSum('Pressure', {
  Pascal: ['value']
})

Pressure.prototype.toString = function () {
  return this.cata({
    Pascal: p => `${p} Pa`
  })
}

Pressure.prototype.toNumber = function () {
  return this.cata({
    Pascal: Number
  })
}

export default Pressure
