import { serial as test } from 'ava'

import sinon from 'sinon'
import 'ky-universal'

import Time from '@/types/Time'
import RemoteData from '@/types/RemoteData'

import { actions, mutations, state, getters } from '@/store/weather'

// hooks

test.beforeEach((t) => {
  // context for actions
  t.context = {
    state: {},
    commit: sinon.spy(),
    dispatch: sinon.spy()
  }

  //
  localStorage.clear()
})

// tests

test('state', (t) => {
  const { forecastMap } = state()

  t.deepEqual(forecastMap, {})
})

test('mutations.SET_FORECAST_OF', (t) => {
  const state = {
    forecastMap: {}
  }

  const city = 'Moscow'

  const callWith = data =>
    () => mutations.SET_FORECAST_OF(state, { city, data })

  t.notThrows(callWith(RemoteData.Loading))
  t.deepEqual(state.forecastMap[city], RemoteData.Loading)
})

test('getters.forecastByCity', (t) => {
  const forecastMap = {
    a: RemoteData.NotAsked,
    b: RemoteData.Loading,
    c: RemoteData.Success([]),
    d: RemoteData.Failure(new Error('bad'))
  }

  // shortcut
  const of = getters.forecastByCity({ forecastMap })

  t.is(typeof of, 'function')

  t.is(of('a'), forecastMap.a)
  t.is(of('b'), forecastMap.b)
  t.is(of('c'), forecastMap.c)
  t.is(of('d'), forecastMap.d)

  t.is(of('e'), RemoteData.NotAsked)
})

test('getters.forecastBy', (t) => {
  const t1 = new Date(1)
  const t2 = new Date(2)
  const t3 = new Date(3)

  const timeSeries = [
    { time: t1, data: 1 },
    { time: t2, data: 2 },
    { time: t3, data: 3 }
  ]

  const forecastMap = {
    a: RemoteData.NotAsked,
    b: RemoteData.Loading,
    c: RemoteData.Success(timeSeries),
    d: RemoteData.Failure(new Error('bad'))
  }

  const { forecastBy, forecastByCity } = getters

  const _getters = {
    forecastByCity: forecastByCity({ forecastMap })
  }

  // shortcut
  const of = forecastBy({}, _getters)

  t.is(typeof of, 'function')

  const timeRange = Time.Range(t1, t2)

  t.is(of({ city: 'a', timeRange }), forecastMap.a)
  t.is(of({ city: 'b', timeRange }), forecastMap.b)
  t.deepEqual(
    of({ city: 'c', timeRange }),
    RemoteData.Success([
      { time: t1, data: 1 },
      { time: t2, data: 2 }
    ])
  )

  t.is(of({ city: 'd', timeRange }), forecastMap.d)

  t.is(of({ city: 'x', timeRange }), RemoteData.NotAsked)
})

test('actions.ensureForecastOf (NotAsked)', async (t) => {
  const dispatch = sinon.spy()

  const forecastMap = {
    a: RemoteData.NotAsked,
    b: RemoteData.Loading,
    c: RemoteData.Success([]),
    d: RemoteData.Failure(new Error('bad'))
  }

  const ctx = {
    getters: {
      forecastByCity: getters.forecastByCity({ forecastMap })
    },
    dispatch
  }

  const ensure = city => actions.ensureForecastOf(ctx, { city })

  //

  await ensure('a')
  await ensure('b')
  await ensure('c')
  await ensure('d')
  await ensure('x')

  const targets = dispatch
    .getCalls()
    .map(({ lastArg: { city } }) => city)

  t.deepEqual(targets, ['a', 'x'], 'NotAsked, undefined')
})
