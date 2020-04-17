import { serial as test } from 'ava'

import { forecast } from '@/api/Weather'

// hooks

test('forecast', async (t) => {
  const timeSeries = await forecast('Moscow')

  timeSeries.forEach(assertDataPoint)

  function assertDataPoint ({ time, data }) {
    t.not(time, undefined)
    t.not(data.temperature, undefined)
  }
})
