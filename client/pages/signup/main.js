import { mapState, mapGetters, mapActions } from 'vuex'

import SignupForm from '@/components/SignupForm'

// helpers

const noop = () => null

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
  ...mapState('registration', ['status']),
  ...mapGetters('registration', ['error', 'isLoading'])
}

const watch = {
  status (data) {
    data.cata({
      NotAsked: noop,
      Loading: noop,
      Success: () => this.onSuccess(),
      Failure: noop
    })
  }
}

const methods = {
  onSuccess () {
    this.$router.push({ name: 'login' })
  },
  ...mapActions('registration', ['submit', 'reset'])
}

function resetError () {
  this.error.cata({
    Nothing: () => null,
    Just: () => this.reset()
  })
}

//

export default {
  name: 'SignupPage',
  layout: 'auth',
  components: {
    SignupForm
  },
  computed,
  watch,
  methods,
  mounted: resetError,
  beforeDestroy: resetError
}
