import test from 'ava'

import { Humidity } from '@/types'

const { Relative } = Humidity

test('constructors', (t) => {
  t.is(typeof Relative, 'function')
})
