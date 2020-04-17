import test from 'ava'

import Pressure, { Pascal, Atmosphere } from '@/types/Pressure'

test('Pascal', (t) => {
  t.true(Pressure.is(Pascal(100000)))
})

test('Atmosphere', (t) => {
  t.true(Pressure.is(Atmosphere(0.99)))
})

test.todo('#toAtmosphere')
test.todo('#toNumber')
test.todo('#toString')
