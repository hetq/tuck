import test from 'ava'

import { Temperature, RemoteData } from '@/types'

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
