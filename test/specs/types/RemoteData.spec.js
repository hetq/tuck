import test from 'ava'

import { RemoteData } from '@/types'

const { NotAsked, Loading, Success, Failure } = RemoteData

test('#map', (t) => {
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

test('#isNotAsked', (t) => {
  t.true(NotAsked.isNotAsked())
  t.false(Loading.isNotAsked())
  t.false(Success('ok').isNotAsked())
  t.false(Failure(new Error('bad')).isNotAsked())
})

test('#isLoading', (t) => {
  t.false(NotAsked.isLoading())
  t.true(Loading.isLoading())
  t.false(Success('ok').isLoading())
  t.false(Failure(new Error('bad')).isLoading())
})

test('#isSuccess', (t) => {
  t.false(NotAsked.isSuccess())
  t.false(Loading.isSuccess())
  t.true(Success('ok').isSuccess())
  t.false(Failure(new Error('bad')).isSuccess())
})

test('#isFailure', (t) => {
  t.false(NotAsked.isFailure())
  t.false(Loading.isFailure())
  t.false(Success('ok').isFailure())
  t.true(Failure(new Error('bad')).isFailure())
})

test('#getOrElse', (t) => {
  t.is(NotAsked.getOrElse(1), 1)
  t.is(Loading.getOrElse(1), 1)
  t.is(Success(2).getOrElse(1), 2)
  t.is(Failure(2).getOrElse(1), 1)
})
