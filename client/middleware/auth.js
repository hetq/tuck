const paramsFor = (route) => {
  const origin = route.fullPath

  return origin === process.env.rootPath
    ? {}
    : { query: { origin } }
}

export default function ({ store, redirect, route }) {
  const { isAuthenticated } = store.getters

  const { name } = route
  const hasOpenTarget = name === 'login'

  // allow only /login for user unknown
  return isAuthenticated || hasOpenTarget
    ? Promise.resolve()
    : redirect({ name: 'login', ...paramsFor(route) })
}
