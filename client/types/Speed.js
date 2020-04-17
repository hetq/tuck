import { taggedSum } from 'daggy'

//

const Speed = taggedSum('Speed', {
  Metric: ['value']
})

//

const { Metric } = Speed

//

Speed.prototype.toString = function () {
  return this.cata({
    Metric: v => `${v.toFixed(2)} m/sec`
  })
}

Speed.prototype.toNumber = function () {
  return this.cata({
    Pascal: Number,
    Atmosphere: Number
  })
}

//

export default Speed

export { Metric }
