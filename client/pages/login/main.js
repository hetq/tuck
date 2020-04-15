import { mapState, mapGetters, mapActions } from 'vuex'

import LoginForm from '@/components/LoginForm'

// helpers

const noop = () => null

const nextUrlFor = route =>
  route.query.origin ||
  process.env.rootPath

//

const computed = {
  errorMessage () {
    return this.error
      .map(err => err.message)
      .getOrElse(null)
  },
  ...mapState('session', ['remoteToken']),
  ...mapGetters('session', ['error', 'isLoading'])
}

const watch = {
  remoteToken (data) {
    data.cata({
      NotAsked: noop,
      Loading: noop,
      Success: () => this.callback(),
      Failure: noop
    })
  }
}

const methods = {
  showError (err) {
    this.errorMessage = err.message
  },
  hideError () {
    this.errorMessage = null
  },
  submitLogin (formData) {
    this.login(formData)
  },
  callback () {
    const nextUrl = nextUrlFor(this.$route)
    this.$router.push(nextUrl)
  },
  ...mapActions('session', ['login', 'reset'])
}

//

export default {
  name: 'LoginPage',
  layout: 'auth',
  components: {
    LoginForm
  },
  fetch ({ store, redirect, route }) {
    if (store.getters.isAuthenticated) {
      redirect(nextUrlFor(route))
    }
  },
  computed,
  watch,
  methods
}
