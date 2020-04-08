export default function ({ store, redirect, route }) {
  const { isAuthenticated } = store.getters
  const isTargetAuth = route.name === 'auth'

  const origin = route.fullPath

  // allow only /auth for user unknown
  if (!isAuthenticated) {
    return isTargetAuth
      ? Promise.resolve()
      : redirect({ name: 'auth', query: { origin } })
  } else {
    return isTargetAuth
      ? redirect('/')
      : Promise.resolve()
  }
}
