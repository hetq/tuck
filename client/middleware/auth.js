const OPEN_TARGETS = [
  'login',
  'signup'
]

//

const paramsFor = (route) => {
  const origin = route.fullPath

  // conceal if default
  return origin === process.env.rootPath
    ? {}
    : { query: { origin } }
}

//

export default function ({ store, redirect, route }) {
  const { isAuthenticated } = store.getters

  const hasOpenTarget = OPEN_TARGETS.includes(route.name)

  // branch for user unknown
  return isAuthenticated || hasOpenTarget
    ? Promise.resolve()
    : redirect({ name: 'login', ...paramsFor(route) })
}
