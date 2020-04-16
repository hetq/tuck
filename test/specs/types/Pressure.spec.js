import test from 'ava'

import { Pressure } from '@/types'

const { Pascal } = Pressure

test('constructors', (t) => {
  t.is(typeof Pascal, 'function')
})
