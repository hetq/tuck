import test from 'ava'

import { Temperature } from '@/types'

const { Kelvin, Celcius } = Temperature

test('constructors', (t) => {
  t.is(typeof Kelvin, 'function')
  t.is(typeof Celcius, 'function')
})

test('#asCelcius', (t) => {
  t.deepEqual(
    Kelvin(273).asCelcius(),
    Celcius(0)
  )

  t.deepEqual(
    Celcius(0).asCelcius(),
    Celcius(0)
  )
})
