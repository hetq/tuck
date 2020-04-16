import test from 'ava'

import * as R from 'ramda'
import * as D from 'date-fns'

import {
  timeFromDateISO,
  timeToDateISO,
  rangeFromPairISO,
  rangeToPairISO
} from '@/components/TimeRangeInput/helpers'

test('timeFromDateISO', (t) => {
  t.true(R.is(Date, timeFromDateISO('2020-01-01')))
})

test('timeToDateISO', (t) => {
  t.true(R.is(String, timeToDateISO(new Date())))
})

test('rangeToPairISO', (t) => {
  const range = {
    start: new Date(1987, 1, 11),
    end: new Date(1989, 6, 10)
  }

  const pair = rangeToPairISO(range)

  t.true(Array.isArray(pair))
  t.is(pair.length, 2)
})

test('rangeFromPairISO', (t) => {
  const pair = ['1989-01-11', '1988-06-10']

  const { start, end } = rangeFromPairISO(pair)

  t.true(D.isValid(start))
  t.true(D.isValid(end))

  t.true(start < end)
})
