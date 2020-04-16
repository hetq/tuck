import { mapState, mapGetters, mapActions } from 'vuex'

import SignupForm from '@/components/SignupForm'

// helpers

const noop = () => null

//

const computed = {
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

//

export default {
  name: 'LoginPage',
  layout: 'auth',
  components: {
    SignupForm
  },
  // fetch ({ store, redirect, route }) {
  //   if (store.getters.isAuthenticated) {
  //     redirect(nextUrlFor(route))
  //   }
  // },
  computed,
  watch,
  methods
}
