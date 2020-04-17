import { mapGetters, mapActions } from 'vuex'

import LoginForm from '@/components/LoginForm'

// helpers

//

const computed = {
  hasError () {
    return this.error
      .map(() => true)
      .getOrElse(false)
  },
  errorMessage () {
    return this.error
      .map(err => err.message)
      .getOrElse(null)
  },
  ...mapGetters('session', ['error', 'isLoading'])
}

const methods = {
  ...mapActions('session', ['login', 'reset'])
}

function resetError () {
  this.error.cata({
    Nothing: () => null,
    Just: () => this.reset()
  })
}

//

export default {
  name: 'LoginPage',
  layout: 'auth',
  components: {
    LoginForm
  },
  computed,
  methods,
  mounted: resetError,
  beforeDestroy: resetError
}
