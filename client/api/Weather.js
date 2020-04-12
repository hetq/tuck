import ky from 'ky-universal'

//

const appid = process.env.OPENWEATHERMAP_API_KEY
const prefixUrl = process.env.OPENWEATHERMAP_API_HOST || 'http://api.openweathermap.org/data/2.5/'

//

const client = ky.extend({ prefixUrl })

//

const toCelsius = k => k - 273

//

const dataPointFrom = (item) => {
  const time = new Date(item.dt * 1000)

  const data = {
    temperature: toCelsius(item.main.temp),
    humidity: item.main.humidity
  }

  return { time, data }
}

//

function forecast ({ city }) {
  const url = `forecast?q=${city}&appid=${appid}`

  const recover = res => res.list.map(dataPointFrom)

  return client
    .get(url)
    .json()
    .then(recover)
}

export { forecast }
