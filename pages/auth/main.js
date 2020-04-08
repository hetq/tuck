import { mapState, mapActions } from 'vuex'

import UserLoginForm from '@/components/UserLoginForm'
import UserSignupForm from '@/components/UserSignupForm'

import { statuses } from '@/store/auth'

// settings

const ROOT_PATH = process.env.rootPath

// helpers

const nextUrlFor = route =>
  route.query.origin || ROOT_PATH

//

const data = () => ({
  tab: null,
  hasVisibleError: false,
  errorMessage: null
})

const computed = {
  hasStatus () {
    return status => this.status === status
  },
  isLoading () {
    return this.hasStatus(statuses.PENDING)
  },
  ...mapState('auth', ['status', 'token'])
}

const watch = {
  status () {
    this.reset()
  }
}

const methods = {
  displayError (err) {
    this.errorMessage = err.message
    this.hasVisibleError = true
  },
  hideError () {
    this.errorMessage = null
    this.hasVisibleError = false
  },
  submitLogin (formData) {
    this
      .login(formData)
      .catch(err => this.displayError(err))
      .then(() => this.callback())
  },
  submitSignup (formData) {
    this
      .signup(formData)
      .catch(err => this.displayError(err))
      .then(() => this.callback())
  },
  reset () {
    this.hideError()
  },
  callback () {
    const nextUrl = nextUrlFor(this.$route)
    this.$router.push(nextUrl)
  },
  ...mapActions('auth', ['login', 'signup'])
}

//

export default {
  name: 'AuthPage',
  layout: 'auth',
  components: {
    UserLoginForm,
    UserSignupForm
  },
  fetch ({ store, redirect, route }) {
    if (store.getters.isAuthenticated) {
      redirect(nextUrlFor(route))
    }
  },
  data,
  computed,
  watch,
  methods
}
