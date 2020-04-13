import test from 'ava'

import Temperature from '@/types/Temperature'
import Time from '@/types/Time'
// import RemoteData from '@/types/RemoteData'

//

test('Temperature', (t) => {
  const { Celcius, Kelvin } = Temperature

  const k = Kelvin(280)
  const c = Celcius(7)

  t.deepEqual(
    k.asCelcius(),
    c
  )

  t.log('Kelvin:', k.toString())
  t.log('Celcius:', c.toString())
})

test('Time', (t) => {
  const { Timestamp: time } = Time

  //

  t.deepEqual(
    time.fromSeconds(1),
    time(1000)
  )

  // equals

  t.true(
    time(10).equals(time(10))
  )

  // gt

  t.true(
    time(10).gt(time(8))
  )

  t.false(
    time(10).gt(time(10))
  )

  // gte

  t.true(
    time(10).gte(time(10))
  )
})

test.todo('RemoteData')
