import { taggedSum } from 'daggy'

//

const ATM_FACTOR = 1 / 101325

//

const pascalToAtm = pascal => pascal * ATM_FACTOR

//

const Pressure = taggedSum('Pressure', {
  Pascal: ['value'],
  Atmosphere: ['value']
})

//

const { Pascal, Atmosphere } = Pressure

//

Pressure.prototype.toAtmosphere = function () {
  return this.cata({
    Pascal: p => Atmosphere(pascalToAtm(p)),
    Atmosphere: () => this
  })
}

Pressure.prototype.toString = function () {
  return this.cata({
    Pascal: p => `${p} Pa`,
    Atmosphere: atm => `${atm.toFixed(4)} Atm`
  })
}

Pressure.prototype.toNumber = function () {
  return this.cata({
    Pascal: Number,
    Atmosphere: Number
  })
}

//

export default Pressure

export { Pascal, Atmosphere }
