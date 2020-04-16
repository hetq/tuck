import test from 'ava'

import R from 'ramda'

import Maybe from '@/types/Maybe'

const { Nothing, Just } = Maybe

test('constructors', (t) => {
  t.truthy(Nothing)
  t.truthy(Just)
})

test('of', (t) => {
  const x = 1

  t.deepEqual(Maybe.of(x), Just(x))
})

test('empty', (t) => {
  t.is(Maybe.empty(), Nothing)
})

test('fromOptional', (t) => {
  const { fromOptional: from } = Maybe

  t.deepEqual(from(null), Nothing)
  t.deepEqual(from(undefined), Nothing)

  t.deepEqual(from(0), Just(0), '0 as value')
  t.deepEqual(from(false), Just(false), 'false as value')
})

test('#map', (t) => {
  const f = x => x + 1

  t.deepEqual(
    Just(1).map(f),
    Just(2)
  )

  t.deepEqual(
    Nothing.map(f),
    Nothing
  )
})

test('#reduce', (t) => {
  const x = 'x'
  const y = 'y'

  const f = R.concat

  t.deepEqual(R.reduce(f, x, Just(y)), f(x, y))
  t.deepEqual(R.reduce(f, x, Nothing), x)
})

test('#alt', (t) => {
  t.deepEqual(
    Just(1).alt(Just(2)),
    Just(1)
  )

  t.deepEqual(
    Nothing.alt(Just(2)),
    Just(2)
  )

  t.deepEqual(
    Just(1).alt(Nothing),
    Just(1)
  )

  t.deepEqual(
    Nothing,
    Nothing
  )
})

test('#getOrElse', (t) => {
  t.is(Just(1).getOrElse(2), 1)
  t.is(Nothing.getOrElse(2), 2)
})
