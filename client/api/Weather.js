import ky from 'ky-universal'

// import Time from '@/types/Time'
// import Temperature from '@/types/Temperature'

//

const appid = process.env.OPENWEATHERMAP_API_KEY
const prefixUrl = process.env.OPENWEATHERMAP_API_HOST || 'http://api.openweathermap.org/data/2.5/'

//

const client = ky.extend({ prefixUrl })

//

const dataPointFrom = ({ dt, main }) => {
  const time = new Date(dt * 1000)

  const data = {
    temperature: main.temp
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
