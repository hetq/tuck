import { statuses as authStatuses } from './auth'

export const getters = {
  isAuthenticated (state) {
    return state.auth.status === authStatuses.OK
  }
}
