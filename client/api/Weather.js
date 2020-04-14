import ky from 'ky-universal'

import { Temperature, Humidity, Pressure } from '@/types'

//

const appid = process.env.OPENWEATHERMAP_API_KEY
const prefixUrl = process.env.OPENWEATHERMAP_API_HOST || 'http://api.openweathermap.org/data/2.5/'

//

const client = ky.extend({ prefixUrl })

//

const parseItem = ({ dt, main }) => {
  const time = new Date(dt * 1000)

  const data = {
    temperature: Temperature.Kelvin(main.temp).asCelcius(),
    humidity: Humidity.Relative(main.humidity),
    pressure: Pressure.Pascal(main.pressure * 100)
  }

  return { time, data }
}

//

function forecast (location) {
  const url = `forecast?q=${location}&appid=${appid}`

  const recover = ({ list }) => list.map(parseItem)

  return client
    .get(url)
    .json()
    .then(recover)
}

export { forecast }
