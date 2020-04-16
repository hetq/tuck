const OPEN_TARGETS = [
  'login',
  'signup'
]

//

const paramsFor = (route) => {
  const targetUrl = route.fullPath

  // conceal if default
  return targetUrl === process.env.rootPath
    ? {}
    : { query: { targetUrl } }
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
