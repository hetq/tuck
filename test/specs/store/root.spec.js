import { serial as test } from 'ava'

import { statuses as authStatuses } from '@/store/auth'
import { getters } from '@/store'

// tests

test('getters.isAuthenticated', (t) => {
  const when = getters.isAuthenticated
  const withStatus = status => ({ auth: { status } })

  t.true(when(withStatus(authStatuses.OK)))

  t.false(when(withStatus(authStatuses.NONE)))
  t.false(when(withStatus(authStatuses.PENDING)))
  t.false(when(withStatus(authStatuses.FAILED)))
})
