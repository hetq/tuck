const OPEN_TARGETS = [
  'login',
  'signup'
]

//

export default function ({ store, redirect, route }) {
  const session = store.getters['session/payload']

  const hasSession = session
    .map(() => true)
    .getOrElse(false)

  const hasOpenTarget = OPEN_TARGETS.includes(route.name)

  if (hasSession && hasOpenTarget) {
    redirect({ name: 'dashboard' })
  }

  if (!hasSession && !hasOpenTarget) {
    redirect({ name: 'login' })
  }

  // branch for user unknown
  return Promise.resolve()
}
