import test from 'ava'

import Temperature from '@/types/Temperature'
import Time from '@/types/Time'
import RemoteData from '@/types/RemoteData'

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
  const { Point, Range } = Time

  //

  t.deepEqual(
    Point.fromSeconds(1),
    Point(1000)
  )

  // equals

  t.true(
    Point(10).equals(Point(10))
  )

  //

  const a = Point(2)
  const b = Point(4)
  const c = Point(6)

  const ab = Range(a, b)
  const ac = Range(a, c)

  t.true(a.isWithin(ac), 'inclusive start')
  t.true(b.isWithin(ac))
  t.true(c.isWithin(ac), 'inclusive end')

  t.false(c.isWithin(ab))
})

test('RemoteData', (t) => {
  const { NotAsked, Loading, Success, Failure } = RemoteData

  const fn = () => 'mapped'

  t.deepEqual(
    NotAsked.map(fn),
    NotAsked
  )

  t.deepEqual(
    Loading.map(fn),
    Loading
  )

  t.deepEqual(
    Success('initial').map(fn),
    Success('mapped')
  )

  t.deepEqual(
    Failure(new Error('initial')).map(fn),
    Failure(new Error('initial'))
  )
})
