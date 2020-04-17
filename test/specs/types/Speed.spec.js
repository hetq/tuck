import test from 'ava'

import Speed, { Metric } from '@/types/Speed'

test('Metric', (t) => {
  t.true(Speed.is(Metric(1.2)))
})

test.todo('#toNumber')
test.todo('#toString')
