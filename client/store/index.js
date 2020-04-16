export const getters = {
  isAuthenticated (state, getters) {
    return getters['session/token']
      .cata({
        Nothing: () => false,
        Just: () => true
      })
  },
  user (state, getters) {
    return getters['session/payload']
      .getOrElse(null)
  }
}
