import { taggedSum } from 'daggy'

//

const KELVIN_OFFSET = 273 // better keep this int

//

const kelvinToCelcius = kelvin => kelvin - KELVIN_OFFSET

//

const Temperature = taggedSum('Temperature', {
  Celcius: ['value'],
  Kelvin: ['value']
})

Temperature.prototype.asCelcius = function () {
  return this.cata({
    Celcius: () => this,
    Kelvin: k => Temperature.Celcius(kelvinToCelcius(k))
  })
}

Temperature.prototype.toString = function () {
  return this.cata({
    Celcius: t => `${t.toFixed(2)} °C`,
    Kelvin: t => `${t.toFixed(2)} K`
  })
}

Temperature.prototype.toNumber = function () {
  return this.cata({
    Celcius: Number,
    Kelvin: Number
  })
}

//

export default Temperature
