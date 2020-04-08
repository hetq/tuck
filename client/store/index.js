import jwt from 'jsonwebtoken'

import { statuses as authStatuses } from './auth'

export const getters = {
  isAuthenticated (state) {
    return state.auth.status === authStatuses.OK
  },
  user (state, getters) {
    if (!getters.isAuthenticated) {
      return null
    }

    return jwt.decode(state.auth.token)
  }
}
