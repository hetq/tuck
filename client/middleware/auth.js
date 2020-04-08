const paramsFor = (route) => {
  const origin = route.fullPath

  return origin === process.env.rootPath
    ? {}
    : { query: { origin } }
}

export default function ({ store, redirect, route }) {
  const { isAuthenticated } = store.getters
  const isTargetAuth = route.name === 'auth'

  // allow only /auth for user unknown
  if (!isAuthenticated && !isTargetAuth) {
    return redirect({ name: 'auth', ...paramsFor(route) })
  }

  return Promise.resolve()
}
